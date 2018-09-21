import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import './App.css';
// import NavBar from './Components/Navbar/navbar';
import DevSignUp from './Components/DevSignUp/DevSignUp';
import DevLogin from './Components/DevLogIn/DevLogIn';
import LandingPage from './Components/Landing Page/landing-page';
import DevProfile from './Components/DevProfile/DevProfile';
import DevInfoEditz from './Components/DevInfoEditz/DevInfoEditz'
import Billing from './Components/Billing/billing';
<<<<<<< HEAD
import SearchGeolocation from './Components/InputGeolocation/InputGeolocation';
||||||| merged common ancestors
=======
import EmpSignUp from './Components/EmployerSignUp/EmployerSignUp';
import EmpList from './Components/EmployerList/EmpOPList';
>>>>>>> ed5eb29e2aff4c5008dba750c8a1afc5bee00214

import DevList from './Components/DevList/DevList';

class App extends Component {
  state = {
    isSignedIn: false,
    userInfo: {
      
    }
  };
  render() {
<<<<<<< HEAD
    return (
      <div>
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
          <Route path="/geolocation" component={SearchGeolocation} />
        </Switch>
      </div>
    );
  }
||||||| merged common ancestors
      return (
        <div>
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
  
=======
      return (
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
            <Route path="/dev-login" component={DevLogin} />
          </Switch>
        </div>
      );
    }
  
>>>>>>> ed5eb29e2aff4c5008dba750c8a1afc5bee00214
}

export default App;
