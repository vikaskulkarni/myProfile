import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LiComponent from './LiComponent';

class FirstLevelHeaderComponent extends Component {
  static checkForItemsInProps(props) {
    const { items } = { ...props };
    let activeLi = '';

    if (items && items.header && items.header.length > 0) {
      activeLi = items.header[0].name;
      for (let i = 0; i < items.header.length; i += 1) {
        const firstHeaderItem = items.header[i];
        if (firstHeaderItem.default) {
          activeLi = firstHeaderItem.name;
        }
        if (firstHeaderItem.isActive) {
          activeLi = firstHeaderItem.name;
        }

      }
    }
    return { activeSelected: activeLi, items: props.items };
  }

  constructor(props) {
    super(props);
    const itemState = FirstLevelHeaderComponent.checkForItemsInProps(props);
    this.state = { activeSelected: itemState.activeSelected, items: itemState.items, activeLi: '' };
    this.activeMenuName = itemState.activeSelected;

    this.toggleClass = this.toggleClass.bind(this);
    this.toggleClass(this.activeMenuName);
  }

  componentWillReceiveProps(props) {
    const itemState = FirstLevelHeaderComponent.checkForItemsInProps(props);
    this.setState({ activeSelected: itemState.activeSelected, items: itemState.items });
    this.activeMenuName = itemState.activeSelected;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.activeSelected === nextState.activeSelected) return false;
    return true;
  }

  populateSubmenu = (title, name, children) => {
    this.props.populateSecondaryNavigation(title, name, children);
  };

  toggleClass = (itemName) => {
    const menus = this.state.items;
    const headerItems = menus.header;
    let activeLi = '';
    for (let i = 0; i < headerItems.length; i += 1) {
      if (headerItems[i].name === itemName) {
        activeLi = headerItems[i].name;
        if (headerItems[i].children && headerItems[i].children.length > 0) {
          this.props.populateSecondaryNavigation(
            headerItems[i].title,
            headerItems[i].name,
            headerItems[i].children
          );
        }
      }
    }
    this.activeMenuName = activeLi;
  };

  render() {
    const menuItems = this.state.items;
    return (
      <div>

        <nav className="navbar navbar-expand-lg navbar-dark py-0">
          <div style={{ padding: '3px 0' }}>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {menuItems &&
                menuItems.header &&
                menuItems.header.map(item => (
                  <LiComponent
                    item={item}
                    key={item.name}
                    isActive={this.activeMenuName === item.name}
                    onToggle={this.toggleClass}
                    targetMenu={`#${item.name}`}
                    secondLevel={this.props.secondLevel}
                    populateSubmenu={this.populateSubmenu}
                  />
                ))}
            </ul>
            <span className="navbar-text">
              <i className={this.state.items.title.class}></i>
              <span className="mx-2">{this.state.items.title.label}</span>
              <i className={`${this.state.items.title.class} cog-rotate mr-4`}></i>
            </span>
          </div>

        </nav>
      </div>
    );
  }
}

FirstLevelHeaderComponent.propTypes = {
  user: PropTypes.string,
  secondLevel: PropTypes.string.isRequired,
  populateSecondaryNavigation: PropTypes.func
};

FirstLevelHeaderComponent.defaultProps = {
  populateSecondaryNavigation: () => {}
};

export default FirstLevelHeaderComponent;
