import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/Landing Page/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import DevInfoEditz from './Components/DevInfoEditz/DevInfoEditz'
import Billing from './Components/Billing/billing';
import EmpSignUp from './Components/EmployerSignUp/EmployerSignUp';
import EmpList from './Components/EmployerList/EmpOPList';


import DevList from './Components/DevList/DevList';


class App extends Component {
  state = {
    isSignedIn: false,
    userInfo: {
      
    }
  };
  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleOauth = (e) => {
    // Prevents page reload
    e.preventDefault();
    console.log("boo")
    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('fnPnyGWcUzhJ7NqGVQTgU0ux4f8');

    // Popup Github and ask for authorization
    window.OAuth.popup('github').then((provider) => {

      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        console.log("data: ", data);
        alert("Welcome " + data.name + "!");
      });

      // You can also call Github's API using .get()
      provider.get('/user').then((data) => {
         console.log('self data:', data);
      });

    });
  }
  render() {
      return (
        <div>
          <NavBar />
          <div className="TopContainer">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/dev-profiles" component={DevProfile} />
              <Route path="/billing" component={Billing} />
              <Route path="/dev-list" component={DevList} />
              <Route path="/emp-signup" component={EmpSignUp} />
              <Route path="/emp-list" component={EmpList} />
              <Route path="/dev-info-edit" component={DevInfoEditz} />
              {/* For testing purpose */}
              <Route path="/dev-signup" component={DevSignUp} />
              {/* <Route path="/dev-login" component={DevLogin}  /> */}
              <Route path="/dev-login" render={ (props) =>  <DevLogin {...props} handleOauth={this.handleOauth} /> } />
            </Switch>
          </div>
        </div>
      );
    }
  
}

export default App;
