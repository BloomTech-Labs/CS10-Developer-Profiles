import logo from '../../logo.svg';
import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS

const API_AUTH = process.env.REACT_APP_API_AUTH_ENPOINT;
const AUTH_USERNAME = process.env.REACT_APP_AUTH_USERNAME;
const AUTH_PASSWORD = process.env.REACT_APP_AUTH_PASSWORD;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const Page404 = (
      <div>
        <br />
        <h5>Something went wrong,</h5>
        <br />
        <p>the page you are looking for is no here...</p>
        <br />
        <Link to="/">
          <button>Go back to home.</button>
        </Link>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container custom-container">
          <div className="row">{/* ADD COMPONENTS HERE */}</div>
        </div>
      </div>
    );
  }
}

export default App;
