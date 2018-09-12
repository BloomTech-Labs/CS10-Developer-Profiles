import React, { Component } from 'react';
import './App.css';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';

class App extends Component {
  state = {
    isSignedIn: false
  }
  render() {
    if(this.state.isSignedIn){
      return (
        <div>
          <DevLogin />
        </div>
      );
    }
    else{
      return (
        <div>
          <DevSignUp />
        </div>
      );
    }
  }
}


export default App;


