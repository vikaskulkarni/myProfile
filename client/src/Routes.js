import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ContactCard from "./components/ContactCard";
import About from "./components/About";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute path="/" exact component={Login} props={childProps} />
    <UnauthenticatedRoute
      path="/signup"
      component={Signup}
      props={childProps}
    />

    <AuthenticatedRoute
      path="/home"
      exact
      component={Home}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/contact"
      component={ContactCard}
      props={childProps}
    />
    <AuthenticatedRoute path="/about" component={About} props={childProps} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
