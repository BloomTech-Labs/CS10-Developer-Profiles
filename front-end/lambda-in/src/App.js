import React, { Component } from 'react';
import './App.css';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    isSignedIn: true
  }
  render() {
    return (
      <div>
          <Route exact path="/" render={ (props) =>  <DevLogin {...props} />  } />
          <Route path="/login" render={ (props) =>  (<DevLogin {...props} />  )  } />
          <Route path="/signup" render={ (props) =>  (<DevSignUp {...props} />  )  } />
      </div>
    );
  }
}


export default App;


