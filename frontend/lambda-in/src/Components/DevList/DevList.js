import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import DevProfileCard from './DevProfileCard';
import Pagination from '../Pagination/Pagination';

const ENABLE = 'Enable';
const DISABLE = 'Disable';
const FILTERS = {
  acclaim: { filter: 'lambdaBadge', filterToggle: 'lambdaBadgeSwitch' }
};

const styles = {
  mainContainer: {
    padding: '0 30px'
  }
};

class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.getQuery(),
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: this.getCurrentPage(),
      seekers: [],
      lambdaBadge: true,
      lambdaBadgeSwitch: false
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
    const url = query === '' ? '/api/seekers' : `/api/seekers?${query}`;
    const config = {
      headers: {
        Authorization: localStorage.token
      }
    };

    axios
      .get(url, config)
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

  setActiveFilters = () => {
    const activeFilters = this.state.query.split('&');
    const filterNames = Object.keys(FILTERS);
    const updateState = {};

    activeFilters.forEach(activeFilter => {
      const filter = activeFilter.split('=');
      if (filterNames.includes(filter[0])) {
        updateState[FILTERS[filter[0]].filterToggle] = true;
        updateState[FILTERS[filter[0]].filter] = +filter[1] ? true : false;
      }
    });

    this.setState(updateState);
  };

  handleSwitch = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSwitchEnable = event => {
    const enable = event.target.innerHTML === ENABLE;
    event.target.innerHTML = enable ? DISABLE : ENABLE;
    this.setState({ [event.currentTarget.name]: enable });
  };

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.getQuery();

    if (newQuery !== this.state.query) {
      this.getSeekers(newQuery);
    }
  }

  componentDidMount() {
    this.setActiveFilters();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.mainContainer} spacing={24}>
          <Grid item className={classes.sideBar} xs={3}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    name="lambdaBadge"
                    checked={this.state.lambdaBadge}
                    color="primary"
                    onChange={this.handleSwitch}
                  />
                }
                label="Lambda Badge"
                disabled={!this.state.lambdaBadgeSwitch}
              />
              <Button
                name="lambdaBadgeSwitch"
                size="small"
                onClick={this.handleSwitchEnable}
              >
                {this.state.lambdaBadgeSwitch ? DISABLE : ENABLE}
              </Button>
            </FormGroup>
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
                pathname={window.location.pathname}
                query={this.state.query}
              />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DevList);
