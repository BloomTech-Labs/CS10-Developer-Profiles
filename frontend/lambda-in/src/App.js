import React, { Component, Fragment } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/LandingPage/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import DevProfile2 from './Components/DevProfile2/DevProfile2';
import DevInfoEditz from './Components/DevInfoEditz/DevInfoEditz';
import Billing from './Components/Billing/billing';
import EmpSignUp from './Components/EmployerSignUp/EmployerSignUp';
import EmpList from './Components/EmployerList/EmpOPList';
import UserSetting from './Components/UserSetting/UserSetting';
import SearchGeolocation from './Components/InputGeolocation/SearchGeolocation';

import PassProps from './Components/DevInfoEditz/DevInfoEditz';

import DevList from './Components/DevList/DevList';
import Page404 from './Components/Page404/Page404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      userInfo: '', // To be populated after 'login' || 'register' from other components.
      userType: '', // 'seeker' || 'employer'
      updateState: '', // 'updating' || 'updated' || 'error'
      deleteState: '', // 'deleting' || 'deleted' || 'error'
    };
  }

  resetState = {
    isSignedIn: false,
    userInfo: '',
    userType: '',
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
  /**
   * Set APP's global state.
   *
   * @method setGlobalState
   * @param {object} properties - Properties to be set. { property_name: property_value }
   * @return {void}
   *
   * @example Pass as a prop to component.
   * <Component setGS={this.setGlobalState} />
   */
  setGlobalState = properties => {
    console.log({ setGS: properties });
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
            {/* LANDINGPAGE */}
            <Route exact path="/" component={LandingPage} />

            {/* BROWSE */}
            <Route path="/meetdev" component={DevList} />
            <Route path="/meetposition" component={EmpList} />

            {/* BILLING: If user is not Authenticated 'Redirect' to home page */}
            <Route path="/billing" render={() => (isSignedIn ? <Billing /> : <Redirect to="/" />)} />

            {/* DEVELOPER START */}
            {/* LOGIN: Redirect to user Profile after login */}
            <Route
              path="/dev-login"
              render={() => (isSignedIn ? redirectToUserProfile : <DevLogin setGS={this.setGlobalState} handleOauth={this.handleOauth}/>)}
            />
            {/* SIGNUP: Redirect to user Profile after signup */}
            <Route
              path="/dev-signup"
              render={() => (isSignedIn ? redirectToUserProfile : <DevSignUp setGS={this.setGlobalState} />)}
            />
            {/* PROFILE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/dev-profile"
              render={() => (isSignedIn ? <DevProfile2 getGS={this.getGlobalState} /> : <Redirect to="/" />)}
            />
            <Route path="/dev-profile2" render={() => <DevProfile getGS={this.getGlobalState} />} />
            {/* EDIT PAGE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/dev-info-edit"
              render={props =>
                isSignedIn ? (
                  <DevInfoEditz {...props} setGS={this.setGlobalState} getGS={this.getGlobalState} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            {/* DEVELOPER END */}

            {/* EMPLOYER START */}
            {/* LOGIN: Redirect to user Profile after login */}
            {/* SIGNUP: Redirect to user Profile after signup */}
            <Route
              path="/employer-signup"
              render={() => (isSignedIn ? redirectToUserProfile : <EmpSignUp setGS={this.setGlobalState} />)}
            />
            {/* PROFILE: If user is not Authenticated 'Redirect' to home page */}
            <Route path="/emp-profile" render={() => (isSignedIn ? null : <Redirect to="/" />)} />
            {/* EDIT PAGE: If user is not Authenticated 'Redirect' to home page */}
            {/* EMPLOYER END */}
            <Route component={Page404} />
          </Switch>

        </div>
      </div>
    );
  }
}

export default App;
