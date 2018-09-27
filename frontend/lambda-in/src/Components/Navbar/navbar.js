import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
//import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import './navbar.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SimpleMenu from '../SignUp Menu/sign-up';

class NavBar extends React.Component {
  render() {
    return (
      <Paper>
        <div className="navBar">
          <div className="leftNavBar">
            <Link to="/">
              <Button>find Devlopers</Button>
            </Link>
            {/* <Link to="/browse-developers"> */}
            <Link to="/dev-list">
              <Button>Browse</Button>
            </Link>
            <Link to="/dev-profiles">
              <Button>profile</Button>
            </Link>

            {/* ONLY FOR TESTING PURPOSE */}
            <Link to="/dev-info-edit">
              <Button>update profile</Button>
            </Link>

            {/* START - Just for test purpose */}
            {/* <Link to="/billing"> */}
            <Link to="/billing">
              <Button>Billing</Button>
            </Link>
            {/* END - Just for test purpose */}
          </div>
          <div className="rightNavBar">
            <SimpleMenu />
            <Link to="/dev-login">
              <Button>Log-in</Button>
            </Link>
          </div>
        </div>
      </Paper>
    );
  }
}

export default NavBar;
