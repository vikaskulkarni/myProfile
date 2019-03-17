import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalHeader from '../components/header/GlobalHeader';
import Table from '../components/table/Table';
import SearchBox from '../components/search/SearchBox';
import searchByValue from '../components/search/searchByValue';
import GlobalFooter from '../components/footer/GlobalFooter';
import ClientAPIService from '../service/ClientAPIService';
import menuItems from './menuItems';
import orderTemplate from './orderTemplate';
import table from './table';
import formFields from './formFields';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      menu: menuItems,
      immutableTableData: [],
      tableColumns: table.columns,
      selectedOrder: orderTemplate,
      selectedOrderRow: orderTemplate,
      editMode: false,
      customers: [],
      selectedCustomer: {},
      selectedCustomerName: "",
      selectedAddress: {},
      selectedCustomersData: [],
      products: [],
      selectedProduct: {},
      selectedProductName: "",
      selectedProductPrice: "",
      selectedProductsData: [],
      currency: [{ _id: "EUR", value: "EUR" }, { _id: "USD", value: "USD" }],
      selectedCurrency: "EUR",
      itemOrderCount: [],
      customerItems: [],
      totalAmountPaid: 0,
      firstName: "",
      lastName: "",
      address: ""
    };
    this.orderSelected = this.orderSelected.bind(this);
    this.getTotalAmountPaid = this.getTotalAmountPaid.bind(this);
    this._clientAPIService = new ClientAPIService();
    this._antsURL = '/api/orders/';
  }
  componentWillMount() {
    this.getDataFromServer();
    this.getDropdownDataFromServer('/api/customers', false);
    this.getDropdownDataFromServer('/api/products', true);
    this.getItemOrderCount();
  }

  getTotalAmountPaid(customer_id) {
    const successCB = (responseData) => {
      this.setState({
        totalAmountPaid: responseData.data
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    this._clientAPIService.setUrl('/api/getMoneyByCustomer/' + customer_id).doGetCall(successCB, errorCB);
  }

  getItemOrderCount = () => {
    const successCB = (responseData) => {
      this.setState({
        itemOrderCount: responseData.data
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    this._clientAPIService.setUrl('/api/itemCount/').doGetCall(successCB, errorCB);
  }

  getCustomerItems = (id) => {
    const successCB = (responseData) => {
      this.setState({
        customerItems: responseData.data
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    this._clientAPIService.setUrl('/api/customerItems/' + id).doGetCall(successCB, errorCB);
  }

  onSearch = (value) => {
    const filteredData = searchByValue([...this.state.immutableTableData], value, ['_id']);
    this.setState({ selectedCustomersData: filteredData });
  };

  showAllOrders = () => {
    this.getDataFromServer();
  }

  getDataFromServer = (id) => {
    let customer = this.state.customers && id && this.state.customers.filter(item => item._id == id);
    let address = customer && customer[0] && customer[0].address;
    const successCB = (responseData) => {
      this.setState({
        selectedCustomersData: responseData.data,
        selectedAddress: id || (responseData.data.length !== 0 && responseData.data[0].shipment.customer_id),
        selectedCustomer: id || (responseData.data.length !== 0 && responseData.data[0].shipment.customer.id),
        selectedOrderRow: responseData.data.length !== 0 && { ...responseData.data[0] },
        address: address || (responseData.data.length !== 0 && responseData.data[0].shipment.address),
        immutableTableData: [...responseData.data],
        selectedOrder: responseData.data.length !== 0 && { ...responseData.data[0] },
        editMode: responseData.data.length !== 0
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
      this.setState({
        editMode: false
      });
    };

    if (id)
      this._clientAPIService.setUrl('/api/ordersByCustomerId/' + id).doGetCall(successCB, errorCB);
    else
      this._clientAPIService.setUrl(this._antsURL).doGetCall(successCB, errorCB);
  };

  getDropdownDataFromServer = (url, isProduct) => {
    const successCB = (responseData) => {
      this.setState({
        customers: responseData.data,
        selectedCustomer: responseData.data[0] && responseData.data[0]._id,
        firstName: responseData.data[0] && responseData.data[0].firstName,
        lastName: responseData.data[0] && responseData.data[0].lastName,
        selectedCustomerName: responseData.data[0] && responseData.data[0].firstName + " " + responseData.data[0].lastName,
        selectedAddress: responseData.data[0] && responseData.data[0]._id
      });
      this.getDataFromServer(responseData.data[0]._id);
      this.getTotalAmountPaid(responseData.data[0]._id);
    };

    const successCBP = (responseData) => {
      this.setState({
        products: responseData.data,
        selectedProductPrice: responseData.data[0].price,
        selectedProductName: responseData.data[0].name
      });
      this.getCustomerItems(responseData.data[0]._id);
    };

    const scb = isProduct ? successCBP : successCB;

    const errorCB = (error) => {
      toast.error('Error getting data!', {
        autoClose: false
      });
    };
    this._clientAPIService.setUrl(url).doGetCall(scb, errorCB);
  };

  orderSelected(rowIdx) {
    const selectedOrderRow = this.state.selectedCustomersData[rowIdx];
    let prod = this.state.products.filter(item => item._id == selectedOrderRow.product.product_id);

    this.setState({ selectedOrderRow, selectedProduct: selectedOrderRow.product.product_id, selectedCustomer: selectedOrderRow.shipment.customer_id, selectedProductPrice: prod[0].price });
  }

  handleDelete(rowIdx) {
    const successCB = (responseData) => {
      this.getDataFromServer(responseData.customer_id);
      toast.success('Delete Successfull!', {
        autoClose: false
      });
    };

    const errorCB = (error) => {
      toast.error('Delete Failed!', {
        autoClose: false
      });

    };
    this._clientAPIService.setUrl('/api/order/' + this.state.selectedCustomersData[rowIdx]._id).doDeleteCall(successCB, errorCB);
  }

  addClickHandler = () => {
    const requestBody = {
      "customer_id": this.state.selectedCustomer, "product_id": this.state.selectedProduct, "currency": this.state.selectedCurrency
    }
    this.handleSubmit(false, requestBody, '/api/createOrder');
  };

  editClickHandler = () => {
    const requestBody = {
      _id: this.state.selectedOrderRow._id,
      "customer_id": this.state.selectedCustomer, "product_id": this.state.selectedProduct, "currency": this.state.selectedCurrency
    }
    this.handleSubmit(true, requestBody, '/api/order');
  };

  handleSubmit = (editMode, value, url) => {
    url = url || this._antsURL;
    const operationMessage = editMode ? 'Edit' : 'Create';
    const successCB = (responseData) => {
      toast.success(`${operationMessage} Successfull`, {
        autoClose: false
      });
      if (responseData.customer_id)
        this.getDataFromServer(responseData.customer_id);
      else
        this.getDataFromServer();
    };

    const errorCB = (error) => {
      toast.error(`${operationMessage} Failed. Error Code-${error.code}:${error.message}`, {
        autoClose: false
      });
    };

    switch (editMode) {
      case true:
        this._clientAPIService
          .setUrl('/api/order/' + value._id)
          .doPatchCall(successCB, errorCB, value);
        break;
      case false:
        this._clientAPIService.setUrl(url).doPostCall(successCB, errorCB, value);
        break;
      default:
        break;
    }
  };

  checkIfNAN = (ip, field) => {
    document.addEventListener('mousedown', this.dismissToast);
    const numbers = /^[0-9]+$/;

    if (!toast.isActive(this.toastID) && ip !== '.' && !ip.match(numbers)) {
      this.toastID = toast.error(`"${field}" field allows only numbers!`, {
        position: toast.POSITION.TOP_CENTER
      });
    } else this.dismissToast();
  };

  dismissToast = () => {
    toast.dismiss();
    document.removeEventListener('mousedown', this.dismissToast);
  };

  handleDDChange = (event) => {
    if (event.target.id === 'address')
      this.setState({ selectedAddress: event.target.value })
    else if (event.target.id === 'product') {
      this.setState({ selectedProduct: event.target.value })
      let prod = this.state.products.filter(item => item._id == event.target.value);
      this.setState({ selectedProductPrice: prod[0].price, selectedProductName: prod[0].name });
      this.getCustomerItems(event.target.value);
    }
    else if (event.target.id === 'currency')
      this.setState({ selectedCurrency: event.target.value })
    else {
      let customer = this.state.customers.filter(item => item._id == event.target.value);
      this.setState({ selectedCustomer: event.target.value, selectedCustomerName: customer[0].firstName + " " + customer[0].lastName })
      this.getTotalAmountPaid(event.target.value);
    }
    event.target.id !== 'product' && event.target.id !== 'currency' && this.getDataFromServer(event.target.value);
  }

  createNewCustomer = () => {
    const successCB = (responseData) => {
      this.getDropdownDataFromServer('/api/customers', false);
      this.setState({
        customerItems: responseData.data
      });
      toast.success('Customer creation Successfull', {
        autoClose: false
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    const reqBody =
    {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "address": this.state.address
    }

    this._clientAPIService.setUrl('/api/customer').doPostCall(successCB, errorCB, reqBody);
  }

  editExistingCustomer = () => {
    const successCB = (responseData) => {
      this.getDropdownDataFromServer('/api/customers', false);
      this.setState({
        customerItems: responseData.data
      });
      toast.success('Customer edit Successfull', {
        autoClose: false
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    const reqBody =
    {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "address": this.state.address
    }

    this._clientAPIService.setUrl('/api/customer/' + this.state.selectedCustomer).doPatchCall(successCB, errorCB, reqBody);
  }

  deleteCustomer = () => {
    const successCB = (responseData) => {
      this.getDropdownDataFromServer('/api/customers', false);
      this.setState({
        customerItems: responseData.data
      });
      toast.success('Customer Delete Successfull', {
        autoClose: false
      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
    };

    this._clientAPIService.setUrl('/api/customer/' + this.state.selectedCustomer).doDeleteCall(successCB, errorCB);
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  }

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <GlobalHeader items={this.state.menu} />
        <div className="containter-fluid app-body">
          <div className="row">
            <div className="col-sm-4 pt-2">
              <small className="form-text text-muted">
                Customer's First Name
              </small>
              <input
                type="text"
                className="form-control"
                id="customer_firsName"
                placeholder="Enter First Name"
                onChange={this.handleFirstNameChange}
                value={this.state.firstName}
              />
              <small className="form-text text-muted">
                Customer's Last Name
              </small>
              <input
                type="text"
                className="form-control"
                id="customer_lastName"
                placeholder="Enter Last Name"
                onChange={this.handleLastNameChange}
                value={this.state.lastName}
              />
              <small className="form-text text-muted">
                Customer's Address
              </small>
              <input
                type="text"
                className="form-control"
                id="customer_address"
                placeholder="Enter Address"
                onChange={this.handleAddressChange}
                value={this.state.address}
              />
            </div>
            <div className="col-sm-2" style={{ marginTop: '30px' }}>
              <button type="button" className="mb-3 btn btn-primary" onClick={this.createNewCustomer}>
                Create Customer
              </button>
              <button type="button" className="mb-3 btn btn-primary" onClick={this.editExistingCustomer}>
                Edit Customer
              </button>
              <SearchBox placeholder="Search on Order ID" onChange={this.onSearch} />
            </div>
            <div className="col-sm-3" style={{ marginTop: '145px' }}>
              <p className="h6">{this.state.selectedCustomersData.length} Orders</p>
            </div>
            <div className="col-sm-2" style={{ marginTop: '135px' }}>
              <button type="button" className="btn btn-primary" onClick={this.showAllOrders}>
                Show All Orders by All Customers
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4">
              <div className="mb-3">Get all orders from Customer:
                <select className="ml-2" id='customers' onChange={this.handleDDChange} value={this.state.selectedCustomer}>
                  {
                    Object.keys(this.state.customers).map(idx => (
                      <option key={'customer' + idx} value={this.state.customers[idx]._id}>
                        {this.state.customers[idx].firstName + ' ' + this.state.customers[idx].lastName}
                      </option>
                    ))}
                </select>
                <i onClick={this.deleteCustomer} className="ml-2 far fa-trash-alt" style={{ color: 'red', cursor: 'pointer' }} title="Delete Customer. Cannot be Undone!"></i>
              </div>
              <div className="mb-3">Total money paid by <strong>{this.state.selectedCustomerName}</strong> is: <strong>{this.state.totalAmountPaid}</strong> EUR</div>
              <div className="mb-3">Get all orders for Address:
                <select className="ml-2" id='address' onChange={this.handleDDChange} value={this.state.selectedAddress}>
                  {
                    Object.keys(this.state.customers).map(idx => (
                      <option key={'address' + idx} value={this.state.customers[idx]._id}>
                        {this.state.customers[idx].address}
                      </option>
                    ))}
                </select>
              </div>
              <hr />
              <div className="mb-3">Product List:
                <select className="ml-2" id='product' onChange={this.handleDDChange} value={this.state.selectedProduct}>
                  {
                    Object.keys(this.state.products).map(idx => (
                      <option key={'product' + idx} value={this.state.products[idx]._id}>
                        {this.state.products[idx].name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">Product Price: {this.state.selectedProductPrice}</div>
              <div className="mb-3">Currency:
                <select className="ml-2" id='currency' onChange={this.handleDDChange} value={this.state.selectedCurrency}>
                  {
                    Object.keys(this.state.currency).map(idx => (
                      <option key={'currency' + idx} value={this.state.currency[idx]._id}>
                        {this.state.currency[idx].value}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <button type="button" className="btn btn-primary" onClick={this.addClickHandler}>
                  Create New Order
                </button>
                <button type="button" className="ml-2 btn btn-primary" onClick={this.editClickHandler} disabled={!this.state.selectedProductName != ""}>
                  {this.state.selectedProductName != "" && "Update Modified Order"}
                  {this.state.selectedProductName == "" && "Select from Product List"}
                </button>
              </div>
              <div className="my-3">Customers who bought: <strong>{this.state.selectedProductName}</strong></div>
              <div>
                <Table
                  tableData={this.state.customerItems}
                  columns={[
                    {
                      Header: 'Customer Name',
                      accessor: 'name'
                    },
                    {
                      Header: 'Number of times ordered',
                      accessor: 'count'
                    }]}
                />
              </div>
            </div>
            <div className="col-sm-8">
              <Table
                tableData={this.state.selectedCustomersData}
                columns={this.state.tableColumns}
                handleDelete={this.handleDelete}
                rowSelected={this.orderSelected}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-8"><span className="h5">Items Order Count - </span><span className="h6">{this.state.itemOrderCount.length} Items</span></div>
          </div>
          <div className="row my-3">
            <div className="col-sm-4">
              <Table
                tableData={this.state.itemOrderCount}
                columns={[
                  {
                    Header: 'Item Name',
                    accessor: 'name'
                  },
                  {
                    Header: 'Order Count',
                    accessor: 'count'
                  }]}
              />
            </div>
          </div>
        </div>
        <GlobalFooter />
        <ToastContainer />
      </React.Fragment>
    );
  }
}
module.exports = App;
