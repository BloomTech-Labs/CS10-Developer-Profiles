import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/Landing Page/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import DevInfoEditz from './Components/DevInfoEditz/DevInfoEditz';
import Billing from './Components/Billing/billing';
import EmpSignUp from './Components/EmployerSignUp/EmployerSignUp';
import EmpList from './Components/EmployerList/EmpOPList';

import DevList from './Components/DevList/DevList';

class App extends Component {
  state = {
    isSignedIn: false,
    userInfo: {},
  };
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
            <Route path="/employer-signup" component={EmpSignUp} />
            <Route path="/employer-list" component={EmpList} />
            <Route path="/dev-info-edit" component={DevInfoEditz} />
            {/* For testing purpose */}
            <Route path="/dev-signup" component={DevSignUp} />
            <Route path="/dev-login" component={DevLogin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
