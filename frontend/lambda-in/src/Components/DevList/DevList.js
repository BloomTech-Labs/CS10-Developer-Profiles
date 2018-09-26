import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import DevProfileCard from './DevProfileCard';
import Pagination from '../Pagination/Pagination';

const styles = {
  mainContainer: {
    padding: '0 30px'
  }
};

class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      jason: false,
      antoine: false,

      query: this.getQuery(),
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: this.getCurrentPage(),
      seekers: []
    };

    this.getSeekers(this.state.query);
  }

  getQuery = () => {
    const search = window.location.search;
    return search === '' ? search : search.substring(1);
  };

  getCurrentPage = () => {
    const queryArr = this.getQuery().split('&');

    for (let i = 0; i < queryArr.length; i++) {
      const param = queryArr[i].split('=');
      if (param[0] === 'page') return +param[1];
    }

    return 1;
  };

  getSeekers = (query = '') => {
    const config = {
      headers: {
        Authorization: localStorage.token
      }
    };

    axios
      .get(`/api/seekers?${query}`, config)
      .then(response => {
        this.setState({
          query: query,
          count: response.data.count,
          pages: response.data.pages,
          next: response.data.next,
          prev: response.data.prev,
          seekers: response.data.results,
          currentPage: response.data.current
        });
      })
      .catch(err => {
        /**
         * @todo On invalid credentials, redirect to sign in page with message
         * @todo On 404 error, display message on dev list
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
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.mainContainer} spacing="24">
          <Grid item className={classes.sideBar} xs={3}>
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
          </Grid>
          <Grid item className={classes.cardBar} xs={9}>
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
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DevList);
