import React from 'react';
import PropTypes from 'prop-types';

class LiComponent extends React.Component {
  render() {
    const currentItem = this.props.item;
    const baseClass = 'fa fa-fw';
    const className = `${baseClass} ${currentItem.iconClass}`;
    const liBaseClass = 'nav-item navbar-toggle border-left mr-3';
    const liClassName = this.props.isActive ? `${liBaseClass} current` : liBaseClass;

    return (
      <li
        className={liClassName}
        data-toggle={this.props.secondLevel}
        data-target={this.props.targetMenu}
      >
        <div
          onKeyPress={() => {}}
          role="presentation"
          onClick={() => {
            this.props.onToggle(currentItem.name);
          }}
        >
          <a href={currentItem.href} className="nav-link text-white px-4">
            <i className={className} /> <span className="font-size-cls">{currentItem.title}</span>
          </a>
        </div>
      </li>
    );
  }
}

LiComponent.propTypes = {
  item: PropTypes.shape({}),
  isActive: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  secondLevel: PropTypes.string.isRequired,
  targetMenu: PropTypes.string.isRequired
};

LiComponent.defaultProps = {
  item: {},
  isActive: false
};

export default LiComponent;
