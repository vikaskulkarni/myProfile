const formFields = [
  {
    id: '_id',
    label: 'Order ID',
    type: 'label',
    definition: 'Order ID',
    placeholder: 'Enter Order ID',
    description: 'ID of the Customer Order'
  },
  {
    id: 'shipment.customer',
    required: true,
    label: 'Customer name',
    type: 'text',
    definition: 'Name of the Customer',
    placeholder: 'Enter customer name',
    description: 'Name of the Customer'
  },
  {
    id: 'shipment.address',
    label: 'Customer address',
    type: 'text',
    definition: 'Customer address',
    placeholder: 'Enter customer address',
    description: 'Address of the customer'
  },
  {
    id: 'shipment.customer_id',
    label: '',
    type: 'hidden'
  },
  {
    id: 'product.title',
    label: 'Item name',
    type: 'text',
    definition: 'Item name',
    placeholder: 'Enter item name',
    description: 'Name of the item'
  },
  {
    id: 'product.item_price',
    label: 'Price',
    type: 'number',
    definition: 'Item price',
    placeholder: 'Enter price',
    description: 'Price of item'
  },
  {
    id: 'product.currency',
    label: 'Currency',
    type: 'select',
    items: ['EUR', 'USD'],
    definition: 'Currency',
    placeholder: 'Enter currency',
    description: 'Currency of the item'
  },
  {
    id: 'product.product_id',
    label: '',
    type: 'hidden'
  }
];

export default formFields;
