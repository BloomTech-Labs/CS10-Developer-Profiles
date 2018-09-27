import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

import NavBar from '../Navbar/navbar';
import DevProfileCard from './DevProfileCard';
import '../DevList/DevList.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default class DevList extends Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    return (
      <div className="App">
        <div className="mainBar">
          <div className="sideBar">
            <Typography variant="headline" component="h3">
              Filters
            </Typography>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.gilad}
                    defaultChecked
                    color="default"
                    onChange={this.handleChange('gilad')}
                    value="gilad"
                  />
                }
                label="Full Stack Web"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">search cities</InputLabel>

              <Input id="input-with-icon-adornment" type="search" />
            </FormControl>
            <br />
            <Typography variant="headline" component="h3">
              Will Relocate
            </Typography>

            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">search cities</InputLabel>

              <Input id="input-with-icon-adornment" type="search" />
            </FormControl>
          </div>
          <div className="cardBar">
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
            <DevProfileCard />
          </div>
        </div>
      </div>
    );
  }
}
