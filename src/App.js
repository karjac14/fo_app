import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/landing";
import about from "./pages/about";
import login from "./pages/login";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={landing} />
            <Route exact path="/about" component={about} />
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
