import React, { Component, Fragment } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.scss";
import LoaderButton from "../components/LoaderButton";
import { setCookie } from "../utilities/AppUtility";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSkipLogin = event => {
    event.preventDefault();
    this.processLogin("kulkarni.vikasdk@gmail.com", "Password@12");
    setCookie("isSkipLogin", "true");
  };

  navigate2Home = () => {
    this.props.history.push("/home");
  };

  processLogin = async (email, password) => {
    this.setState({ isLoading: true });

    try {
      await Auth.signIn(email, password);
      this.props.userHasAuthenticated(true);
      this.navigate2Home();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.processLogin(this.state.email, this.state.password);
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   this.navigate2Home();
    //   return <Fragment />;
    // } else {
    return (
      <div className="Login m-5">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
            className="btn btn-primary"
          />
          <LoaderButton
            block
            bsSize="small"
            variant="success"
            type="button"
            onClick={this.handleSkipLogin}
            text="Skip Login :)"
            loadingText="Logging in…"
            className="btn btn-success"
          />
        </form>
      </div>
    );
    // }
  }
}
