import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DevProfileCard from './DevProfileCard';
import FilterToggle from './FilterToggle';
import Pagination from '../Pagination/Pagination';

const ENABLE = 'Enable';
const DISABLE = 'Disable';
const FILTERS = {
  acclaim: { label: 'Lambda Badge', name: 'lambdaBadge', toggleName: 'lambdaBadgeSwitch' },
  github: { label: 'GitHub', name: 'github', toggleName: 'githubSwitch' },
  linkedIn: { label: 'LinkedIn', name: 'linkedIn', toggleName: 'linkedInSwitch' },
  portfolio: { label: 'Portfolio', name: 'portfolio', toggleName: 'portfolioSwitch' },
  resume: { label: 'Resume', name: 'resume', toggleName: 'resumeSwitch' },
  projects: { label: 'Has Projects', name: 'projects', toggleName: 'projectsSwitch' },
  experience: { label: 'Has Experience', name: 'experience', toggleName: 'experienceSwitch' },
  education: { label: 'Has Education', name: 'education', toggleName: 'educationSwitch' }
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
      lambdaBadgeSwitch: false,
      github: true,
      githubSwitch: false,
      linkedIn: true,
      linkedInSwitch: false,
      portfolio: true,
      portfolioSwitch: false,
      resume: true,
      resumeSwitch: false,
      projects: true,
      projectsSwitch: false,
      experience: true,
      experienceSwitch: false,
      education: true,
      educationSwitch: false
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
        updateState[FILTERS[filter[0]].toggleName] = true;
        updateState[FILTERS[filter[0]].name] = +filter[1] ? true : false;
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
            <FilterToggle
              filter={FILTERS.acclaim}
              checked={this.state.lambdaBadge}
              enable={this.state.lambdaBadgeSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
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
