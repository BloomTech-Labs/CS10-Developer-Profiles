import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DevProfileCard from './DevProfileCard';
import FilterToggle from './FilterToggle';
import Pagination from '../Pagination/Pagination';

import jobTitles from './jobTitles';
import techSkills from './skills';

const ENABLE = 'Enable';
const DISABLE = 'Disable';
const FILTERS = {
  desiredTitle: {
    type: 'select',
    name: 'desiredTitle',
    placeholder: 'Select Job Title...'
  },
  topSkills: {
    type: 'select',
    name: 'topSkills',
    placeholder: 'Proficient With...'
  },
  addSkills: {
    type: 'select',
    name: 'addSkills',
    placeholder: 'Knowledgeable With...'
  },
  familiar: {
    type: 'select',
    name: 'familiar',
    placeholder: 'Familiar With...'
  },
  acclaim: {
    type: 'toggle',
    label: 'Lambda Badge',
    name: 'acclaim',
    toggleName: 'acclaimSwitch'
  },
  github: {
    type: 'toggle',
    label: 'GitHub',
    name: 'github',
    toggleName: 'githubSwitch'
  },
  linkedIn: {
    type: 'toggle',
    label: 'LinkedIn',
    name: 'linkedIn',
    toggleName: 'linkedInSwitch'
  },
  portfolio: {
    type: 'toggle',
    label: 'Portfolio',
    name: 'portfolio',
    toggleName: 'portfolioSwitch'
  },
  resume: {
    type: 'toggle',
    label: 'Resume',
    name: 'resume',
    toggleName: 'resumeSwitch'
  },
  projects: {
    type: 'toggle',
    label: 'Projects',
    name: 'projects',
    toggleName: 'projectsSwitch'
  },
  experience: {
    type: 'toggle',
    label: 'Experience',
    name: 'experience',
    toggleName: 'experienceSwitch'
  },
  education: {
    type: 'toggle',
    label: 'Education',
    name: 'education',
    toggleName: 'educationSwitch'
  }
};

const desiredTitle = jobTitles.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title
}));

const skills = techSkills.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title
}));

const styles = {
  mainContainer: {
    padding: '0 30px'
  },
  select: {
    zIndex: 2
  }
};

class DevList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: this.getPathname(),
      query: this.getQuery(),
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: this.getCurrentPage(),
      seekers: [],
      desiredTitle: [],
      topSkills: [],
      addSkills: [],
      familiar: [],
      acclaim: true,
      acclaimSwitch: false,
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
      `^${substr}=[0,1]&?|&${substr}=[0,1]|^${substr}=[A-z|+.]+|&${substr}=[A-z|+.]+`,
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
