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
import EmpProfile from './Components/EmpProfile/EmpProfile';
import EmpPositionAdd from './Components/OpenPositionAdd/OpenPositionAdd';
import EmpPositionEdit from './Components/OpenPositionEdit/OpenPositionEdit';

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
      login: false, // false || conflic
    };
    this.resetState = {
      isSignedIn: false,
      userInfo: '',
      userType: '',
      login: false,
      updateState: '', // 'updating' || 'updated' || 'error'
      deleteState: '', // 'deleting' || 'deleted' || 'error'
    };
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
  setGlobalState = (properties) => {
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
  getGlobalState = (property) => {
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
      this.state.userType === 'seeker' ? (
        <Redirect to="/dev-profile" />
      ) : (
        <Redirect to="/emp-profile" />
      );

    return (
      <div>
        <NavBar getGS={this.getGlobalState} logOut={this.handleLogout} />
        <div className="TopContainer">
          <Switch>
            {/* LANDINGPAGE */}
            <Route exact path="/" component={LandingPage} />

            {/* BROWSE */}
            <Route path="/meetdev" component={DevList} />
            <Route path="/meetposition" component={EmpProfile} />

            {/* BILLING: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/billing"
              render={() => (isSignedIn ? <Billing /> : <Redirect to="/" />)}
            />

            {/* DEVELOPER START */}
            {/* LOGIN: Redirect to user Profile after login */}
            <Route
              path="/dev-login"
              render={() =>
                isSignedIn ? (
                  redirectToUserProfile
                ) : (
                  <DevLogin
                    getGS={this.getGlobalState}
                    setGS={this.setGlobalState}
                  />
                )
              }
            />
            {/* SIGNUP: Redirect to user Profile after signup */}
            <Route
              path="/dev-signup"
              render={() =>
                isSignedIn ? (
                  redirectToUserProfile
                ) : (
                  <DevSignUp setGS={this.setGlobalState} />
                )
              }
            />
            {/* PROFILE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/dev-profile"
              render={() =>
                isSignedIn ? (
                  <DevProfile getGS={this.getGlobalState} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            {/* <Route path="/dev-profile2" render={() => <DevProfile2 getGS={this.getGlobalState} />} /> */}
            {/* EDIT PAGE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/dev-info-edit"
              render={(props) =>
                isSignedIn ? (
                  <DevInfoEditz
                    {...props}
                    setGS={this.setGlobalState}
                    getGS={this.getGlobalState}
                  />
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
              render={() =>
                isSignedIn ? (
                  redirectToUserProfile
                ) : (
                  <EmpSignUp setGS={this.setGlobalState} />
                )
              }
            />
            {/* PROFILE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/emp-profile"
              render={() => (isSignedIn ? <EmpProfile /> : <Redirect to="/" />)}
            />
            {/* EDIT PAGE: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/emp-info-edit"
              render={(props) =>
                isSignedIn ? (
                  <EmpPositionEdit
                    {...props}
                    setGS={this.setGlobalState}
                    getGS={this.getGlobalState}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            {/* ADD POSITION: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/emp-pos-add"
              render={(props) =>
                isSignedIn ? (
                  <EmpPositionAdd
                    {...props}
                    setGS={this.setGlobalState}
                    getGS={this.getGlobalState}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            {/* EDIT POSITION: If user is not Authenticated 'Redirect' to home page */}
            <Route
              path="/emp-pos-edit"
              render={(props) =>
                isSignedIn ? (
                  <EmpPositionEdit
                    {...props}
                    setGS={this.setGlobalState}
                    getGS={this.getGlobalState}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            {/* EMPLOYER END */}
            <Route component={Page404} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
