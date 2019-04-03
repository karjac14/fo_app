import React, { Component } from 'react';
import Nav from './components/Nav'
import landing from './pages/landing'
import about from './pages/about'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={landing} />
            <Route exact path="/about" component={about} />
          </Switch>


        </div>
      </Router>
    );
  }
}

export default App;
