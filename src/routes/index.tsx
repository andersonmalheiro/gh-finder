import React from "react";
import { Home } from "pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
    </Router>
  );
};
