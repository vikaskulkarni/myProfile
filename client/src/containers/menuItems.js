const menuItems = {
  header: [
    {
      title: 'Profile',
      default: true,
      name: 'profile',
      iconClass: 'fa-th',

      children: [
        {
          title: 'Basic',
          name: 'basic',
          iconClass: 'fa-list-alt'
        }
      ]
    }
  ],
  title: { label: 'Profile', class: 'fas fa-male' }
};

export default menuItems;
