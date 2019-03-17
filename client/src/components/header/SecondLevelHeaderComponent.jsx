import React from 'react';
import PropTypes from 'prop-types';

const getLiClass = (item) => {
  const baseClass = 'fa fa-fw';
  const className = `${baseClass} ${item.iconClass}`;

  return className;
};

class SecondLevelHeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    const ctxPath = props.contextPath;

    const menuKey = Object.keys(props.items).filter(key => props.items[key].href === ctxPath);

    this.state = {
      activeLi: menuKey.length != 0 ? props.items[menuKey].name : props.items[0].name
    };
    this.secondActiveMenuName = this.state.activeLi;

    this.toggleClass = this.toggleClass.bind(this);
  }

  componentWillReceiveProps(props) {
    let activeSecondLi = this.secondActiveMenuName
      ? this.secondActiveMenuName
      : props.items[0].name;

    this.toggleClass(activeSecondLi, props.items);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.activeLi) return false;
    return true;
  }

  toggleClass = (itemName, headerItems) => {
    let activeLi;
    for (let i = 0; i < headerItems.length; i += 1) {
      if (headerItems[i].name === itemName || headerItems[i].href === itemName) {
        activeLi = headerItems[i].name;
        break;
      }
    }
    if (!activeLi) {
      Object.keys(this.props.parentItems).forEach((parentItemIdx) => {
        const parentItem = this.props.parentItems[parentItemIdx];
        Object.keys(parentItem.children).forEach((childItemIdx) => {
          const childItem = parentItem.children[childItemIdx];
          if (childItem.href === itemName || childItem.name === itemName) {
            activeLi = childItem.name;
          }
        });
      });
    }
    this.secondActiveMenuName = activeLi;
    this.setState({ activeLi });
  };

  render() {
    return (
      <nav className={`${this.props.secondLevelClass} navbar-expand-lg`} id={this.props.id}>
        <ul className="nav navbar-nav mr-auto pl-4">
          {this.props.items &&
            this.props.items.map(item => (
              <li className="nav-item t-2nd" key={item.name}>
                <div
                  className="px-3"
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.toggleClass(item.name, this.props.items);
                  }}
                >
                  <div className={this.state.activeLi === item.name ? 'active text-light' : 'text-light'}>
                    <i className={getLiClass(item)} /> <span>{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </nav>
    );
  }
}

SecondLevelHeaderComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  secondLevelClass: PropTypes.string.isRequired,
  id: PropTypes.string
};

SecondLevelHeaderComponent.defaultProps = {
  items: [],
  id: undefined
};

export default SecondLevelHeaderComponent;
