import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
//import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import './navbar.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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
            <Link to="/">
              <Button>Browse</Button>
            </Link>
            {/* <Link to="/profile"> */}
            <Link to="/">
              <Button>profile</Button>
            </Link>

            {/* START - Just for test purpose */}
            <Link to="/dev-signup">
              <Button>Signup</Button>
            </Link>
            {/* END - Just for test purpose */}
          </div>
          <div className="rightNavBar">
            {/* <Link to="/billing"> */}
            <Link to="/">
              <Button>Billing</Button>
            </Link>
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
