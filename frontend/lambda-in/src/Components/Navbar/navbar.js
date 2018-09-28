import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SimpleMenu from '../SignUp Menu/sign-up';

import './navbar.css';

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
        <Link to={userType === 'seeker' ? '/dev-profile' : '/emp-profile'}>
          <Button>profile</Button>
        </Link>
        <Link to="/billing">
          <Button>Billing</Button>
        </Link>
      </Fragment>
    ),
    rightNavBar: <Button onClick={logOut}>Log out</Button>,
  };

  /**
   * Define Links to be displayed to NON authorized users
   */
  const withNotToken = {
    leftNavBar: <Fragment />, // There are no Links to display
    rightNavBar: (
      <Fragment>
        <SimpleMenu />
        <Link to="/dev-login">
          <Button>Log-in</Button>
        </Link>
      </Fragment>
    ),
  };

  return (
    <Paper>
      <div className="navBar">
        <div className="leftNavBar">
          <Link to="/">
            <Button>meetdev</Button>
          </Link>
          <Link to={userType === 'seeker' ? '/meetposition' : '/meetdev'}>
            <Button>Browse</Button>
          </Link>
          {isSignedIn ? withToken.leftNavBar : withNotToken.leftNavBar}
        </div>
        <div className="rightNavBar">{isSignedIn ? withToken.rightNavBar : withNotToken.rightNavBar}</div>
      </div>
    </Paper>
  );
};
