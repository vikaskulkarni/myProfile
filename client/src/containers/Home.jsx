import React, { Fragment, Component } from "react";
import { API } from "aws-amplify";
import "./Home.scss";
import styled from "styled-components";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
  ExampleBody as ContainerBody
} from "./HomeStyles";
import SideNavigation from "../components/sidenavigation/SideNavigation";
import PieChart from "../components/PieChart";
import CardDetails from "../components/CardDetails";
import Proficiency from "./Proficiency";
import Achievements from "./Achievements";
import ProjectHighlights from "./ProjectHighlights";
import loader from "./loader.gif";

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 155px);
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 180px;
  margin-right: 10px;
  line-height: 22px;
`;

const pieColors = [
  "#6B7A8F",
  "#004586",
  "#ff3a22",
  "#431c5d",
  "#569d1b",
  "#ffd321",
  "#ff420e"
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      profileItemsOrder: { items: [] },
      defaultSelected: {},
      defaultSelectedItemValue: {},
      proficiency: true,
      achievements: false,
      projectHighlights: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const profile = await this.profile();
      this.setState({ profile });
      this.props.profile(profile);
      this.createListingOrderFromProfile();
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  createListingOrderFromProfile() {
    let profile = this.state.profile;
    let profileItemsOrder = this.state.profileItemsOrder;
    profile.listingOrder.map(profileItem => {
      if (profile[profileItem.label].default) {
        profileItemsOrder.defaultSelectedPath = profileItem.label;
        this.setState({
          defaultSelected: profile[profileItem.label]
        });
      }
      profileItemsOrder.items.push(profileItem);
    });
  }

  profile() {
    return API.get(
      "profiles",
      "/profiles/692b15a0-837e-11e9-a87a-edde4b6a37c1"
    );
  }

  changeSelectedItemInCard = selectedPie => {
    this.setState({ defaultSelectedItemValue: selectedPie.selectedItem });
  };

  changeSelectedItemInPanel = selectedNavItem => {
    const me = this;
    switch (selectedNavItem.path) {
      case "experience":
      case "qualification":
        this.setState({
          proficiency: false,
          achievements: false,
          projectHighlights: false,
          defaultSelected: me.state.profile[selectedNavItem.path],
          defaultSelectedItemValue:
            me.state.profile[selectedNavItem.path].values[0]
        });
        break;
      case "proficiency":
        this.setState({
          proficiency: true,
          achievements: false,
          projectHighlights: false
        });
        break;
      case "achievements":
        this.setState({
          proficiency: false,
          achievements: true,
          projectHighlights: false
        });
        break;
      case "projectHighlights":
        this.setState({
          projectHighlights: true,
          achievements: false,
          proficiency: false
        });
        break;
    }
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="row top-margin ml-2 mr-2">
        {!this.state.isLoading && (
          <AppContainer>
            <div className="col-sm-3">
              <Navigation>
                <SideNavigation
                  profileItemsOrder={this.state.profileItemsOrder}
                  onSelectNavItem={this.changeSelectedItemInPanel}
                />
              </Navigation>
            </div>

            {!this.state.proficiency &&
              !this.state.achievements &&
              !this.state.projectHighlights && (
                <div className="col-sm">
                  <ContainerBody>
                    <PieChart
                      selectedItem={this.state.defaultSelected}
                      colors={pieColors}
                      onMouseOverPie={this.changeSelectedItemInCard}
                    />
                  </ContainerBody>
                </div>
              )}

            {this.state.proficiency &&
              !this.state.achievements &&
              !this.state.projectHighlights && (
                <Fragment>
                  <div className="col-sm-8 my-4">
                    <Proficiency values={this.state.profile.proficiency} />
                  </div>
                  <div className="col-sm-1" />
                </Fragment>
              )}

            {this.state.achievements &&
              !this.state.proficiency &&
              !this.state.projectHighlights && (
                <Fragment>
                  <div className="col-sm-7 my-4">
                    <Achievements values={this.state.profile.achievements} />
                  </div>
                  <div className="col-sm-2" />
                </Fragment>
              )}

            {!this.state.proficiency &&
              !this.state.achievements &&
              !this.state.projectHighlights && (
                <div className="col-sm">
                  <CardDetails
                    selectedItemValue={this.state.defaultSelectedItemValue}
                  />
                </div>
              )}

            {this.state.projectHighlights &&
              !this.state.proficiency &&
              !this.state.achievements && (
                <Fragment>
                  <div className="col-sm-9">
                    <ProjectHighlights
                      values={this.state.profile.projectHighlights}
                    />
                  </div>
                </Fragment>
              )}
          </AppContainer>
        )}
        {this.state.isLoading && <img className="center-img" src={loader} />}
      </div>
    );
  }
}
