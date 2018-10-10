import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import SignUpMenu from '../SignUpMenu/sign-up';

import './navbar.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#5160B5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B79A3F',
    },
  },
});

/**
 * Functional component responsible of Navigation links
 *
 * @prop {function} getGS - Return from APP's global state properties and its values.
 * @prop {function} logOut - Logout user && Remove JWT.
 * @return {React Component}
 */
export default ({ getGS, logOut }) => {
  const isSignedIn = getGS('isSignedIn');
  const userType = getGS('userType');

  /**
   * Define Links to be displayed to authorized users
   */
  const withToken = {
    /**
     * Define links based on 'userType'
     */
    leftNavBar: (
      <Fragment>
        <Button color='inherit' className='navButton'
          component={Link}
          to={userType === 'seeker' ? '/dev-profile' : '/emp-profile'}
        >
          profile
        </Button>
        <Button color='inherit' className='navButton' component={Link} to="/billing">
          Billing
        </Button>
      </Fragment>
    ),
    rightNavBar: <Button color='inherit' onClick={logOut}>Log out</Button>,
  };

  /**
   * Define Links to be displayed to NON authorized users
   */
  const withNotToken = {
    leftNavBar: <Fragment />, // There are no Links to display
    rightNavBar: (
      <Fragment>
        <SignUpMenu />
        <Button color='inherit' component={Link} to="/dev-login">
          Log-in
        </Button>
      </Fragment>
    ),
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color='primary'>
        <div className="navBar">
          <div className="leftNavBar">
            <Button color='inherit' className='navButton' component={Link} to="/">
              Home
            </Button>
            <Button color='inherit' className='navButton'
              component={Link}
              to={'/meetdev'}
            >
            Browse
            </Button>
            {isSignedIn ? withToken.leftNavBar : withNotToken.leftNavBar}
          </div>
          <div className="rightNavBar">
            {isSignedIn ? withToken.rightNavBar : withNotToken.rightNavBar}
          </div>
        </div>
      </AppBar>
    </MuiThemeProvider>
  );
};
