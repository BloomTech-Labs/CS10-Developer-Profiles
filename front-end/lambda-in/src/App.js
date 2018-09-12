import React, { Component } from 'react';
import './App.css';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import DevList from './Components/DevList/DevList';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    isSignedIn: false
  }
  render() {
      return (
        <div>
          <Route exact path="/" render={ (props) =>  <DevList {...props}/> } />
          <Route exact path="/login" render={ (props) =>  <DevLogin {...props}/> } />
          <Route exact path="/signup" render={ (props) =>  <DevSignUp {...props}/> } />
        </div>
      );
  }
}


export default App;


