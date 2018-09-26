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
import Page404 from './Components/Page404/Page404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      userInfo: '', // To be populated after 'login' || 'register' from other components.
      userType: '', // 'seeker' || 'employer'
    };
  }

  resetState = {
    isSignedIn: false,
    userInfo: '',
    userType: '',
  };

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
   * @example Pass as a prop to component.
   * <Component getGS={this.getGlobalState} />
   */
  getGlobalState = property => {
    const self = this;
    return property ? self.state[property] : self.state;
  };

  /**
   * Logout user && Remove JWT.
   *
   * @description Reset APP's state to its default.
   * @param {void}
   * @return {boolean} - "If JWT was removed" ? true : false
   *
   * @example Pass as a prop to component.
   * <Component logOut={this.handleLogout} />
   */
  handleLogout = () => {
    localStorage.removeItem('token');

    // Check if token was deleted.
    if (localStorage.getItem('token')) {
      return false;
    } else {
      this.setState(this.resetState);
      return true;
    }
  };

  render() {
    const { isSignedIn } = this.state;
    const redirectToUserProfile =
      this.state.userType === 'seeker' ? <Redirect to="/dev-profile" /> : <Redirect to="/emp-profile" />;

    return (
      <div>
        <NavBar getGS={this.getGlobalState} logOut={this.handleLogout} />
        <div className="TopContainer">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dev-signup" component={DevSignUp} />
            <Route path="/meetdev" component={DevList} />
            <Route path="/meetposition" component={EmpList} />

            {/* Redirect to user Profile after login */}
            <Route
              path="/dev-login"
              render={() => (isSignedIn ? redirectToUserProfile : <DevLogin setGS={this.setGlobalState} />)}
            />

            {/* Only allow access to protected components if 'user' is authenticated */}
            {/* If user is not Authenticated 'Redirect' to home page */}
            <Route path="/billing" render={() => (isSignedIn ? <Billing /> : <Redirect to="/" />)} />
            <Route path="/dev-profile" render={() => (isSignedIn ? <DevProfile /> : <Redirect to="/" />)} />
            <Route path="/employer-signup" render={() => (isSignedIn ? <EmpSignUp /> : <Redirect to="/" />)} />
            <Route path="/dev-info-edit" render={() => (isSignedIn ? <DevInfoEditz /> : <Redirect to="/" />)} />

            <Route component={Page404} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
