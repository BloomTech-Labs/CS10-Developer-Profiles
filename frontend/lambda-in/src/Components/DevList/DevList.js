import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import DevProfileCard from './DevProfileCard';

import '../DevList/DevList.css';

export default class DevList extends Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false,

    count: 0,
    next: null,
    prev: null,
    seekers: []
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: localStorage.token
      }
    };

    axios
      .get('/api/seekers', config)
      .then(response => {
        this.setState({
          count: response.data.count,
          next: response.data.next,
          prev: response.data.prev,
          seekers: response.data.results
        });
      })
      .catch(err => {
        /**
         * @todo On redirect to sign in page display message telling user they must log in before accessing content
         */
        this.props.history.push('/dev-login');
      });
  }

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
                label="iOS"
              />
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
                label="Android"
              />
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
                label="UI/UX"
              />
            </FormControl>
            <Divider />
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
                label="Lambda Badge"
              />
            </FormControl>
            <Divider />
            <br />
            <FormControl>
              <Typography variant="headline" component="h3">
                Located
              </Typography>
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
                label="with in 100 mile"
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                search cities
              </InputLabel>

              <Input id="input-with-icon-adornment" type="search" />
            </FormControl>
            <br />
            <Typography variant="headline" component="h3">
              Will Relocate
            </Typography>

            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                search cities
              </InputLabel>

              <Input id="input-with-icon-adornment" type="search" />
            </FormControl>
          </div>
          <div className="cardBar">
            {this.state.seekers.map(seeker => (
              <DevProfileCard key={seeker._id} seeker={seeker} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
