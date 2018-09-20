import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
// import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/Landing Page/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import Browse from './Components/Browse/browse(employer-view)';
import Billing from './Components/Billing/billing';
import NavBar from './Components/Navbar/navbar'

import DevList from './Components/DevList/DevList';


class App extends Component {
  state = {
    isSignedIn: false,
  };
  render() {
      return (
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dev-profiles" component={DevProfile} />
            <Route path="/dev-sigup" component={DevSignUp} />
            <Route path="/browse-developers" component={Browse} />
            <Route path="/billing" component={Billing} />
            <Route path="/dev-list" component={DevList} />
            {/* For testing purpose */}
            <Route path="/dev-signup" component={DevSignUp} />
            <Route path="/dev-login" component={DevLogin} />
          </Switch>
        </div>
      );
    }
  
}

export default App;
