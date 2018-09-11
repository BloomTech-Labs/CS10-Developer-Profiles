import React from 'react';
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
                        <Button>find Devlopers</Button>
                        <Button>Browse</Button>
                        <Button>profile</Button>
                    </div>
                    <div className="rightNavBar">
                        <Button>Billing</Button>
                        <Button>Setting</Button>
                    </div>
                </div>
            </Paper>
        )
    }
};

export default NavBar;
