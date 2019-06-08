import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Education from "./components/Education";
import Experience from "./components/Experience";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/education" exact component={Education} props={childProps} />
        <Route path="/experience" component={Experience} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>;
