import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

export default function Routes() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Fragment>
  );
}
