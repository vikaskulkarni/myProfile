import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    _id: Number,
    customer_id: Number,
    product_id: Number,
    currency: String
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);