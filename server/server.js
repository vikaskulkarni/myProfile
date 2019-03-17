import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getKeys } from './keys';
import Customer from './entities/customer';
import Product from './entities/product';
import Order from './entities/order';
import Counters from './entities/counters';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

app.use(express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(getKeys('dbUri'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const parseOrders = (orders, res) => {
    let finalResponseData = [];
    if (orders.length > 0) {
        orders.forEach(function (order) {
            Customer.findById(order.customer_id, (err, customer) => {
                Product.findById(order.product_id, (err, product) => {
                    let orderData = {
                        "_id": order._id,
                        "shipment": {
                            "customer": customer.firstName + ' ' + customer.lastName,
                            "address": customer.address,
                            "customer_id": order.customer_id
                        },
                        "product": {
                            "title": product.name,
                            "item_price": product.price,
                            "currency": order.currency,
                            "product_id": order.product_id
                        }
                    }
                    finalResponseData.push(orderData);

                    if (finalResponseData.length === orders.length)
                        return res.json({ success: true, data: finalResponseData });
                })
            })
        });
    }
    else return res.json({ success: true, data: finalResponseData });
}

router.get('/', (req, res) => {
    res.json({ message: 'Testing... World!' });
});
router.get('/customers', (req, res) => {
    Customer.find((err, customers) => {
        if (err) return res.json(500, { success: false, error: err });
        return res.json({ success: true, data: customers });
    })
});
router.get('/products', (req, res) => {
    Product.find((err, products) => {
        if (err) return res.json(500, { success: false, error: err });
        return res.json({ success: true, data: products });
    })
});
router.get('/orders', (req, res) => {
    Order.find((err, orders) => {
        if (err) return res.json(500, { success: false, error: err });
        parseOrders(orders, res);
    });
});
router.get('/ordersByCustomerId/:customerId', (req, res) => {
    Order.find({ customer_id: req.params.customerId }, (err, orders) => {
        if (err) return res.json(500, { success: false, error: err });
        parseOrders(orders, res);
    });
});
router.post('/customer', (req, res) => {
    Counters.findAndModify({ _id: 'customer_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, counter) {
        if (err) throw err;
        let customer = new Customer();
        const { firstName, lastName, address } = req.body;
        customer._id = counter.value.sequence_value;
        customer.address = address;
        customer.firstName = firstName;
        customer.lastName = lastName;

        customer.save(err => {
            if (err) throw err;
            return res.json({ success: true });
        })
    })
})
router.patch('/customer/:_id', (req, res) => {
    const customer = new Customer();
    const { _id } = req.params;
    const { firstName, lastName, address } = req.body;
    var query = { '_id': _id };

    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.address = address;
    Customer.findOneAndUpdate(query, customer, {}, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.json({ success: true });
    });
});
router.delete('/customer/:_id', (req, res) => {
    const { _id } = req.params;
    var query = { '_id': _id };

    Customer.find(query).remove(function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.json({ success: true });
    })
});
router.post('/orders', (req, res) => {
    const order = new Order();
    const customer = new Customer();
    const productEntity = new Product();

    const { shipment, product } = req.body;
    if (!shipment.customer || !product) {
        return res.json({
            success: false,
            error: 'Missing required information!'
        });
    }

    Counters.findAndModify({ _id: 'customer_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, counter) {
        if (err) throw err;
        const custFnLn = shipment.customer.split(' ');
        customer._id = counter.value.sequence_value;
        customer.address = shipment.address;
        customer.firstName = custFnLn[0];
        customer.lastName = custFnLn[1] ? custFnLn[1] : "";

        customer.save(err => {
            if (err) throw err;

            Counters.findAndModify({ _id: 'product_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, prCounter) {
                if (err) throw err;
                productEntity._id = prCounter.value.sequence_value;
                productEntity.name = product.title;
                productEntity.price = product.item_price;

                productEntity.save(err => {
                    if (err) throw err;

                    Counters.findAndModify({ _id: 'order_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, orderCounter) {
                        if (err) throw err;
                        order._id = orderCounter.value.sequence_value;
                        order.customer_id = customer._id;
                        order.product_id = productEntity._id;
                        order.currency = product.currency;
                        order.save(err => {
                            if (err) return res.json({ success: false, error: err });
                            return res.json({ success: true });
                        });
                    });
                });

            });
        });
    });
});

router.post('/createOrder', (req, res) => {
    const order = new Order();

    const { customer_id, product_id, currency } = req.body;
    if (!customer_id || !product_id || !currency) {
        return res.json(500, {
            success: false,
            error: 'Missing required information!'
        });
    }

    Counters.findAndModify({ _id: 'order_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, orderCounter) {
        if (err) throw err;
        order._id = orderCounter.value.sequence_value;
        order.customer_id = customer_id;
        order.product_id = product_id;
        order.currency = currency;
        order.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, customer_id: customer_id });
        });
    });
});

router.patch('/editOrder/:order_id', (req, res) => {
    const order = new Order();

    const { customer_id, product_id, currency } = req.body;
    if (!customer_id || !product_id || !currency) {
        return res.json(500, {
            success: false,
            error: 'Missing required information!'
        });
    }

    Counters.findAndModify({ _id: 'order_id' }, [], { $inc: { sequence_value: 1 } }, {}, function (err, orderCounter) {
        if (err) throw err;
        order._id = orderCounter.value.sequence_value;
        order.customer_id = customer_id;
        order.product_id = product_id;
        order.currency = currency;
        order.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, customer_id: customer_id });
        });
    });
});

router.patch('/order/:_id', (req, res) => {
    const order = new Order();
    const { _id } = req.params;
    const { product_id, currency } = req.body;
    var query = { '_id': _id };

    order.product_id = product_id;
    order.currency = currency;
    Order.findOneAndUpdate(query, order, {}, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.json({ success: true, customer_id: doc.customer_id });
    });
});

router.delete('/order/:_id', (req, res) => {
    Order.findByIdAndRemove(req.params._id, (err, order) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Order successfully deleted",
            id: order._id,
            customer_id: order.customer_id
        };
        return res.status(200).send(response);
    });
});

router.get('/itemCount', (req, res) => {
    Product.find((err, productList) => {
        var productsMap = productList.reduce(function (map, obj) {
            map[obj._id] = obj.name;
            return map;
        }, {});
        let finalResponse = [];

        Order.aggregate([
            { $group: { _id: '$product_id', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ], function (err, productCount) {
            if (err) throw err;
            productCount.forEach(item => {
                finalResponse.push({ name: productsMap[item._id], count: item.count });
                if (finalResponse.length === productCount.length)
                    return res.json({ success: true, data: finalResponse });

            })
        });
    })
})

router.get('/customerItems/:product_id', (req, res) => {
    Customer.find((err, customersList) => {
        var customersMap = customersList.reduce(function (map, obj) {
            map[obj._id] = obj.firstName + ' ' + obj.lastName;
            return map;
        }, {});
        let finalResponse = [];

        Order.find({ product_id: req.params.product_id }, function (err, orders) {
            if (err) throw err;
            let toDecrement = 0;
            if (orders.length > 0) {
                orders.forEach(item => {
                    let foundObj;
                    for (var i = 0; i < finalResponse.length; i++) {
                        if (finalResponse[i].id == item.customer_id) {
                            foundObj = finalResponse[i];
                            break;
                        }
                    }
                    if (foundObj) {
                        foundObj.count += 1;
                        toDecrement += 1;
                    }
                    else
                        finalResponse.push({ name: customersMap[item.customer_id], id: item.customer_id, count: 1 });
                    if (finalResponse.length === orders.length - toDecrement)
                        return res.json({ success: true, data: finalResponse });
                })
            }
            else return res.json({ success: true, data: finalResponse });
        });
    })
})

router.get('/getMoneyByCustomer/:customer_id', (req, res) => {
    Product.find((err, productList) => {
        var productsMap = productList.reduce(function (map, obj) {
            map[obj._id] = parseInt(obj.price);
            return map;
        }, {});
        let finalResponse = 0;
        let counter = 0;
        Order.find({ customer_id: req.params.customer_id }, function (err, orders) {
            if (err) throw err;
            let toDecrement = 0;
            if (orders.length > 0) {
                orders.forEach(item => {
                    counter++;
                    let price = productsMap[item.product_id];
                    finalResponse = finalResponse + price;
                    if (counter === orders.length)
                        return res.json({ success: true, data: finalResponse });
                })
            }
            else return res.json({ success: true, data: finalResponse });
        });
    })
})

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));