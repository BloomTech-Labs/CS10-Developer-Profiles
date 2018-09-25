import React, { Component, Fragment } from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      userInfo: {}, // To be populated after an HTTP request from other components.
      userType: '', // 'seeker' || 'employer'
    };
  }

  /**
   * Set APP's global state.
   *
   * @method setGlobalState
   * @param {object} properties - Properties to be set.
   * @return {void}
   *
   * @example Pass as a prop to component.
   * <Component setGS={this.setGlobalState} />
   */
  setGlobalState = properties => {
    this.setState(properties);
  };

  /**
   * Get APP's global state.
   *
   * @method getGlobalState
   * @param {string} property - the property of which we want to know its value.
   * @return {object} App's global state.
   *
   * @example Pass as a prop to component.
   * <Component getGS={this.getGlobalState} />
   */
  getGlobalState = property => {
    const self = this;
    return property ? self.state[property] : self.state;
  };

  render() {
    return (
      <div>
        <NavBar getGS={this.getGlobalState} />
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
