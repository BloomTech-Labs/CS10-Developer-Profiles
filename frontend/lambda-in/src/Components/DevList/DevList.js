import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DevProfileCard from './DevProfileCard';
import FilterToggle from './FilterToggle/FilterToggle';
import Pagination from '../Pagination/Pagination';
import { ENABLE, DISABLE, SORT, FILTERS } from '../constants';

/**
 * Mock API data calls
 * @todo Add data to db and create API routes to replace these imports
 */
import jobTitles from './jobTitles';
import techSkills from './skills';
import sortOptions from './sortOptions';

const desiredTitle = jobTitles.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title
}));

const skills = techSkills.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title
}));

const sort = sortOptions.map(option => ({
  value: (option.dir === 'dsc' ? '-' : '') + option.type.toLowerCase(),
  label: `${option.type} ${SORT[option.dir]}`
}));

const styles = {
  mainContainer: {
    padding: '0 30px'
  }
};

const selectCustomStyles = {
  menu: (base, state) => ({
    ...base,
    zIndex: 2
  })
};

class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.getFilterState(), {
      pathname: this.getPathname(),
      query: this.getQuery(),
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: this.getCurrentPage(),
      seekers: []
    });

    this.getSeekers(this.state.query);
  }

  getFilterState = () => {
    const state = {};

    Object.keys(FILTERS).forEach(filter => {
      if (FILTERS[filter].type === 'select') {
        state[FILTERS[filter].name] = [];
      }

      if (FILTERS[filter].type === 'toggle') {
        state[FILTERS[filter].name] = true;
        state[FILTERS[filter].toggleName] = false;
      }
    });

    return state;
  };

  getPathname = () => {
    return window.location.pathname;
  };

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
         * @todo Fix status code for invalid credentials
         * @todo On 404 error, display message on dev list
         */
        if (err.response.status === 500) this.props.history.push('/dev-login');
        if (err.response.status === 404) {
          console.log(err.response.data);
          this.setState({
            query: query,
            count: 0,
            pages: 0,
            next: null,
            prev: null,
            seekers: [],
            currentPage: 1
          });
        }
      });
  };

  cleanQuery = substr => {
    const regEx = new RegExp(
      `^${substr}=[0,1]&?|&${substr}=[0,1]|^${substr}=[A-z|+.-]+|&${substr}=[A-z|+.-]+`,
      'i'
    );
    const cleanQuery = this.state.query.replace(regEx, '');
    return cleanQuery === '' ? 'page=1' : cleanQuery;
  };

  setActiveFilters = () => {
    const activeFilters = this.state.query.split('&');
    const filterNames = Object.keys(FILTERS);
    const updateState = {};

    activeFilters.forEach(activeFilter => {
      const filter = activeFilter.split('=');
      if (filterNames.includes(filter[0])) {
        switch (FILTERS[filter[0]].type) {
          case 'toggle':
            updateState[FILTERS[filter[0]].toggleName] = true;
            updateState[FILTERS[filter[0]].name] = +filter[1] ? true : false;
            break;
          case 'select':
            const values = filter[1].split('|').map(value => ({
              value: value,
              label: value.replace(/\+/g, ' ')
            }));
            updateState[FILTERS[filter[0]].name] = values;
            break;
        }
      }
    });

    this.setState(updateState);
  };

  setQuery = query => {
    this.props.history.push({
      pathname: this.state.pathname,
      search: query
    });
  };

  handleSelect = (value, name) => {
    const valStr = `&${name}=${value.map(val => val.value).join('|')}`;
    const newQuery = `${this.cleanQuery(name)}${
      value.length !== 0 ? valStr : ''
    }`;

    this.setQuery(newQuery);
    this.setState({ [name]: value });
  };

  handleSwitch = event => {
    const name = event.target.name;
    const checked = event.target.checked;
    const newQuery = `${this.cleanQuery(name)}&${name}=${checked ? 1 : 0}`;

    this.setQuery(newQuery);
    this.setState({ [name]: checked });
  };

  handleSwitchEnable = event => {
    const enable = event.target.innerHTML === ENABLE;
    const name = event.currentTarget.dataset.filterName;
    const newQuery = enable
      ? `${this.cleanQuery(name)}&${name}=${
          this.state[FILTERS[name].name] ? 1 : 0
        }`
      : `${this.cleanQuery(name)}`;

    this.setQuery(newQuery);
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
            <Select
              placeholder={FILTERS.desiredTitle.placeholder}
              value={this.state.desiredTitle}
              className={classes.select}
              options={desiredTitle}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value =>
                this.handleSelect(value, FILTERS.desiredTitle.name)
              }
              isMulti
            />
            <Select
              placeholder={FILTERS.topSkills.placeholder}
              value={this.state.topSkills}
              className={classes.select}
              options={skills}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value =>
                this.handleSelect(value, FILTERS.topSkills.name)
              }
              isMulti
            />
            <Select
              placeholder={FILTERS.addSkills.placeholder}
              value={this.state.addSkills}
              className={classes.select}
              options={skills}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value =>
                this.handleSelect(value, FILTERS.addSkills.name)
              }
              isMulti
            />
            <Select
              placeholder={FILTERS.familiar.placeholder}
              value={this.state.familiar}
              className={classes.select}
              options={skills}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value =>
                this.handleSelect(value, FILTERS.familiar.name)
              }
              isMulti
            />
            <FilterToggle
              filter={FILTERS.acclaim}
              checked={this.state.acclaim}
              enable={this.state.acclaimSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.projects}
              checked={this.state.projects}
              enable={this.state.projectsSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.experience}
              checked={this.state.experience}
              enable={this.state.experienceSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.education}
              checked={this.state.education}
              enable={this.state.educationSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.github}
              checked={this.state.github}
              enable={this.state.githubSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.portfolio}
              checked={this.state.portfolio}
              enable={this.state.portfolioSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.linkedIn}
              checked={this.state.linkedIn}
              enable={this.state.linkedInSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.resume}
              checked={this.state.resume}
              enable={this.state.resumeSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
          </Grid>
          <Grid item className={classes.cardBar} xs={9}>
            <Select
              placeholder={FILTERS.sort.placeholder}
              value={this.state.sort}
              className={classes.select}
              options={sort}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              onChange={value => this.handleSelect(value, FILTERS.sort.name)}
              isMulti
            />
            {this.state.seekers.map(seeker => (
              <DevProfileCard key={seeker._id} seeker={seeker} />
            ))}
            {this.state.seekers.length !== 0 && (
              <Pagination
                count={this.state.count}
                pages={this.state.pages}
                currentPage={this.state.currentPage}
                pathname={this.state.pathname}
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
