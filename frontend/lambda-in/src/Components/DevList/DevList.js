import React, { Component } from 'react';
import AOS from 'aos';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DevProfileCard from './DevProfileCard';

import './DevList.css';
import 'aos/dist/aos.css';

AOS.init();

class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  render() {
    const { gilad } = this.state;
    return (
      <div className="App">
        <div className="mainBar">
          <div className="sideBar">
            <Typography variant="headline" component="h3">
              Filters
            </Typography>
            <FormControl>
              <FormControlLabel
                control={(
                  <Checkbox
                    name="gilad"
                    checked={gilad}
                    defaultChecked
                    color="default"
                    onChange={this.handleChange}
                    value="gilad"
                  />
                )}
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

export default DevList;
