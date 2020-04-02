import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Darwing from './components/drawing'
import Showing from './components/showing'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/showing">showing</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/showing">
              <Showing />
            </Route>
            <Route path="/">
              <Darwing />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
