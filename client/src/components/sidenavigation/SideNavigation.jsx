import React, { Component, Fragment } from "react";
import { SideNav, Nav as BaseNav } from "react-sidenav";
import { Icon as BaseIcon } from "react-icons-kit";
import { university } from "react-icons-kit/fa/university";
import { building } from "react-icons-kit/fa/building";
import { code } from "react-icons-kit/fa/code";
import { cubes } from "react-icons-kit/fa/cubes";
import { trophy } from "react-icons-kit/fa/trophy";
import styled from "styled-components";

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const IconCnt = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#FF851B",
  selectionBgColor: "#00BCD4"
};

const Text = styled.div`
  font-size: 0.72em;
  text-transform: uppercase;
`;

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class SideNavigation extends Component {
  constructor(props) {
    super();
    this.state = {
      profileItemsOrder: { defaultSelectedPath: "", items: [] }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.profileItemsOrder.items &&
      nextProps.profileItemsOrder.items.length > 0
    ) {
      return { profileItemsOrder: nextProps.profileItemsOrder };
    }
    return null;
  }

  getIconElement = icon => {
    switch (icon) {
      case "university":
        return <Icon icon={university} />;
      case "building":
        return <Icon icon={building} />;
      case "code":
        return <Icon icon={code} />;
      case "trophy":
        return <Icon icon={trophy} />;
      case "cubes":
        return <Icon icon={cubes} />;
    }
  };

  getNavElement = listItems => {
    return (
      <Fragment>
        {listItems.map(listItem => (
          <Nav key={listItem.label} id={listItem.label} className="">
            <IconCnt>{this.getIconElement(listItem.icon)}</IconCnt>
            <Text>{listItem.label}</Text>
          </Nav>
        ))}
      </Fragment>
    );
  };

  onItemSelection = defaultSelectedPath => {
    this.props.onSelectNavItem(defaultSelectedPath);
  };

  render() {
    const listItems = this.state.profileItemsOrder.items;

    if (listItems.length > 0) {
      const navElements = this.getNavElement(listItems);
      return (
        <SideNav
          defaultSelectedPath={this.state.profileItemsOrder.defaultSelectedPath}
          theme={theme}
          onItemSelection={this.onItemSelection}
        >
          {navElements}
        </SideNav>
      );
    } else return <div />;
  }
}

export default SideNavigation;
