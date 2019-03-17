import React from 'react';

const table = {
  columns: [
    {
      Header: 'Order ID',
      accessor: '_id'
    },
    {
      Header: 'Customer name',
      accessor: 'shipment.customer'
    },
    {
      Header: 'Customer address',
      accessor: 'shipment.address'
    },
    {
      Header: 'Item name',
      accessor: 'product.title'
    },

    {
      Header: 'Price',
      accessor: 'product.item_price'
    },
    {
      Header: 'Currency',
      accessor: 'product.currency'
    },
    {
      Header: '',
      accessor: 'delete',
      Cell: row => (
        <div><i className="far fa-trash-alt" style={{ color: 'red', cursor: 'pointer' }}></i></div>
      )
    }
  ]
};
export default table;
