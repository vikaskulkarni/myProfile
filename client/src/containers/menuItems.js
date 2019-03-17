const menuItems = {
  header: [
    {
      title: 'Registry',
      default: true,
      name: 'registry',
      iconClass: 'fa-th',

      children: [
        {
          title: 'Customer Orders',
          name: 'orders',
          iconClass: 'fa-list-alt'
        }
      ]
    }
  ],
  title: { label: 'Ants', class: 'fas fa-cogs' }
};

export default menuItems;
