import React from 'react';
import PropTypes from 'prop-types';
import FirstLevelHeaderComponent from './FirstLevelHeaderComponent';
import SecondLevelHeaderComponent from './SecondLevelHeaderComponent';
import './_header.scss';

class GlobalHeader extends React.Component {
  state = {
    menuTitle: this.props.items.header[0].title,
    menuId: this.props.items.header[0].id,
    menuChildren: this.props.items.header[0].children
  };

  populateSecondaryNavigation = (menuTitle, menuId, children) => {
    this.setState({ menuTitle, menuId, menuChildren: children });
  };

  render() {
    const secondLevelClass = 'collapse_2nd';
    const { items } = this.props;
    const hasHeaderItems = !!(items && items.header && items.header.length > 0);
    return (
      <div className="sticky-top t-global-header">
        <FirstLevelHeaderComponent
          {...this.props}
          populateSecondaryNavigation={this.populateSecondaryNavigation}
          secondLevel={secondLevelClass}
        />

        {hasHeaderItems &&
          this.state.menuChildren &&
          this.state.menuChildren.length > 0 && (
            <SecondLevelHeaderComponent
              {...this.props}
              parentItems={this.props.items.header}
              secondLevelClass={secondLevelClass}
              id={this.state.menuId}
              title={this.state.menuTitle}
              items={this.state.menuChildren}
            />
          )}
      </div>
    );
  }
}

GlobalHeader.propTypes = {
  items: PropTypes.shape({})
};

GlobalHeader.defaultProps = {
  items: {}
};

export default GlobalHeader;
