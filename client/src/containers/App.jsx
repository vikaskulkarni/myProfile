import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

import GlobalHeader from "../components/header/GlobalHeader";
import GlobalFooter from "../components/footer/GlobalFooter";
import Routes from "../Routes";
import "./App.scss";
import { setCookie } from "../utilities/AppUtility";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      profileData: {}
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  profile = profileData => {
    this.setState({ profileData });
  };

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    setCookie("isSkipLogin", "false");
    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      profile: this.profile,
      profileData: this.state.profileData
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <GlobalHeader
            isAuthenticated={this.state.isAuthenticated}
            handleLogout={this.handleLogout}
          />
          <Routes childProps={childProps} />
          <GlobalFooter />
        </div>
      )
    );
  }
}

export default withRouter(App);
