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
import Pagination from '../Pagination/Pagination';

import '../DevList/DevList.css';

export default class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      jason: false,
      antoine: false,

      query: '',
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: 1,
      seekers: []
    };

    this.getSeekers();
  }

  getQuery = () => {
    const search = window.location.search;
    return search === '' ? search : search.substring(1);
  };

  getCurrentPage = query => {
    const queryArr = query.split('&');

    for (let i = 0; i < queryArr.length; i++) {
      const param = queryArr[i].split('=');
      if (param[0] === 'page') return param[1];
    }

    return 1;
  };

  getSeekers = (page = null) => {
    const query = this.getQuery();
    const config = {
      headers: {
        Authorization: localStorage.token
      }
    };

    page = page || this.getCurrentPage(query);

    axios
      .get(`/api/seekers?page=${page}`, config)
      .then(response => {
        this.setState({
          query: query,
          count: response.data.count,
          pages: response.data.pages,
          next: response.data.next,
          prev: response.data.prev,
          seekers: response.data.results,
          currentPage: +page
        });
      })
      .catch(err => {
        /**
         * @todo On redirect to sign in page display message telling user they must log in before accessing content
         */
        this.props.history.push('/dev-login');
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handlePageChange = page => {
    this.getSeekers(page);
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
            {this.state.seekers.length !== 0 && (
              <Pagination
                count={this.state.count}
                pages={this.state.pages}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
