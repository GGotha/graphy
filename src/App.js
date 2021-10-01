import React, { Fragment } from "react";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes />
      </Router>
    </Fragment>
  );
}

export default App;
