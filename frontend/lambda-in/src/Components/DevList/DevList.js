import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AOS from 'aos';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DevProfileCard from './DevProfileCard/DevProfileCard';
import FilterToggle from './FilterToggle/FilterToggle';
import Pagination from '../Pagination/Pagination';
import {
  ENABLE, DISABLE, SORT, FILTERS,
} from '../constants';

import 'aos/dist/aos.css';

/**
 * Mock API data calls
 * @todo Add data to db and create API routes to replace these imports
 */
import jobTitles from './data/jobTitles';
import techSkills from './data/skills';
import sortOptions from './data/sortOptions';

AOS.init();

const jobTitleSelectOptions = jobTitles.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title,
}));

const techSkillsSelectOptions = techSkills.map(title => ({
  value: title.replace(/ /g, '+'),
  label: title,
}));

const sortSelectOptions = sortOptions.map(option => ({
  value: (option.dir === 'dsc' ? '-' : '') + option.type.toLowerCase(),
  label: `${option.type} ${SORT[option.dir]}`,
}));

const styles = {
  mainContainer: {
    padding: '0 30px',
  },
};

const selectCustomStyles = {
  menu: base => ({
    ...base,
    zIndex: 2,
  }),
};

/**
 * Dev List component
 *
 * @description A component that generates the Developer List/Browse page for the application.
 * @class A React class component
 * @prop {String} pathname - The current page url pathname.
 * @example
 *  /meetdev'
 * @prop {String} query - The current page url search query.
 * @example
 *  'page=2&desiredTitle=Front+End|Back+End'
 * @prop {Integer} count - The total number of records being displayed.
 * @prop {Integer} pages - The total number of pages that should exist.
 * @prop {(Null|String)} next - Link to the next page in the GET request.
 * @prop {(Null|String)} prev - Link to the previous page in the GET request.
 * @prop {Integer} currentPage - The current page number.
 * @prop {Array} seekers - A list of seeker's based on the current search query.
 * @prop {Array} sort - Current sorting behavior.
 * @prop {Array} desiredTitle - Current job titles to filter by.
 * @prop {Array} topSkills - Current top skills to filter by.
 * @prop {Array} addSkills - Current additional skills to filter by.
 * @prop {Array} familiar - Current familiar skills to filter by.
 * @prop {Boolean} acclaim - True/False for Lambda Badge filter toggle.
 * @prop {Boolean} acclaimSwitch - True/False if Lambda Badge toggle filter is enabled.
 * @prop {Boolean} github - True/False for GitHub filter toggle.
 * @prop {Boolean} githubSwitch - True/False if GitHub toggle filter is enabled.
 * @prop {Boolean} linkedIn - True/False for LinkedIn filter toggle.
 * @prop {Boolean} linkedInSwitch - True/False if LinkedIn toggle filter is enabled.
 * @prop {Boolean} portfolio - True/False for Portfolio filter toggle.
 * @prop {Boolean} portfolioSwitch - True/False if Portfolio toggle filter is enabled.
 * @prop {Boolean} resume - True/False for Resume filter toggle.
 * @prop {Boolean} resumeSwitch - True/False if Resume toggle filter is enabled.
 * @prop {Boolean} projects - True/False for Project filter toggle.
 * @prop {Boolean} projectsSwitch - True/False if Projects toggle filter is enabled.
 * @prop {Boolean} experience - True/False for Experience filter toggle.
 * @prop {Boolean} experienceSwitch - True/False if Experience toggle filter is enabled.
 * @prop {Boolean} education - True/False for Education filter toggle.
 * @prop {Boolean} educationSwitch - True/False if Education toggle filter is enabled.
 *
 * @see {@link https://material-ui.com/api/grid/ } for the Grid API.
 * @see {@link https://material-ui.com/layout/grid/ } for a demo of the Grid component.
 * @see {@link https://react-select.com/home } for the React Select API.
 * @see {@link ./FilterToggle/README.md } for the FilterToggle API.
 * @see {@link ../Pagination/README.md } for the Pagination API.
 */
class DevList extends Component {
  /**
   * Create a Dev List component
   *
   * @param {Object} props - Component properties.
   */
  constructor(props) {
    super(props);
    const query = DevList.getQuery();

    this.state = Object.assign({}, DevList.getFilterState(), {
      query,
      pathname: DevList.getPathname(),
      count: 0,
      pages: 0,
      next: null,
      prev: null,
      currentPage: DevList.getCurrentPage(),
      seekers: [],
    });

    this.getSeekers = this.getSeekers.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSwitchEnable = this.handleSwitchEnable.bind(this);

    this.getSeekers(query);
  }

  /**
   * Return an additional state object for all filters saved on FILTERS constant.
   *
   * @return {Object} Additional filter state.
   * @example
   *  {
   *    acclaim: true,
   *    acclaimSwitch: false,
   *    sort: []
   *  }
   */
  static getFilterState() {
    const state = {};

    Object.keys(FILTERS).forEach((filter) => {
      if (FILTERS[filter].type === 'select') {
        state[FILTERS[filter].eleName] = [];
      }

      if (FILTERS[filter].type === 'toggle') {
        state[FILTERS[filter].eleName] = true;
        state[FILTERS[filter].toggleName] = false;
      }
    });

    return state;
  }

  /**
   * Return the pathname of the current page.
   *
   * @return {String} Current page pathname.
   * @example
   *  '/meetdev'
   */
  static getPathname() {
    return window.location.pathname;
  }

  /**
   * Return the search query for the current page.
   *
   * @return {String} Current page search query.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   */
  static getQuery() {
    const { search } = window.location;
    return search === '' ? search : search.substring(1);
  }

  /**
   * Determine the current page using the URL query and return it. If no page is set
   * on the URL, return 1.
   *
   * @return {Integer} Current page number.
   */
  static getCurrentPage() {
    const queryArr = DevList.getQuery().split('&');

    for (let i = 0; i < queryArr.length; i += 1) {
      const param = queryArr[i].split('=');
      if (param[0] === 'page') return +param[1];
    }

    return 1;
  }

  /**
   * Component Did Mount method.
   * On initial component mount, set any filters that exist in the url.
   */
  componentDidMount() {
    this.setActiveFilters();
  }

  /**
   * Component Did Update method.
   * On each component update, if a new search query exists, get a new list of seekers with new
   * search query.
   */
  componentDidUpdate() {
    const { query } = this.state;
    const newQuery = DevList.getQuery();

    if (newQuery !== query) {
      this.getSeekers(newQuery);
    }
  }

  /**
   * Use the given search query, concatenated with the API seekers route, to perform a GET request
   * for seekers. On success, save results to state. On error redirect unauthorized users or clear
   * the list of seekers on state.
   *
   * @param {String} query - A URL search query.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   */
  getSeekers(query = '') {
    const url = query === '' ? '/api/seekers' : `/api/seekers?${query}`;
    const config = {
      headers: {
        Authorization: localStorage.token,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        this.setState({
          query,
          count: response.data.count,
          pages: response.data.pages,
          next: response.data.next,
          prev: response.data.prev,
          seekers: response.data.results,
          currentPage: response.data.current,
        });
      })
      .catch((err) => {
        /**
         * @todo On invalid credentials, redirect to sign in page with message
         * @todo Fix status code for invalid credentials
         * @todo On 404 error, display message on dev list
         */
        this.setState({
          query,
          count: 0,
          pages: 0,
          next: null,
          prev: null,
          seekers: [],
          currentPage: 1,
        });
      });
  }

  /**
   * Set the state for any filters currently set on URL.
   */
  setActiveFilters() {
    const { query } = this.state;
    const activeFilters = query.split('&');
    const filterNames = Object.keys(FILTERS);
    const updateState = {};

    activeFilters.forEach((activeFilter) => {
      const filter = activeFilter.split('=');
      if (filterNames.includes(filter[0])) {
        switch (FILTERS[filter[0]].type) {
          case 'toggle':
            updateState[FILTERS[filter[0]].toggleName] = true;
            updateState[FILTERS[filter[0]].eleName] = !!+filter[1];
            break;
          case 'select': {
            const values = filter[1].split('|').map(value => ({
              value,
              label: value.replace(/\+/g, ' '),
            }));
            updateState[FILTERS[filter[0]].eleName] = values;
            break;
          }
          default:
            break;
        }
      }
    });

    this.setState(updateState);
  }

  /**
   * Update the current page url with the given query.
   *
   * @param {String} query - A URL search query.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   */
  setQuery(query) {
    const { history } = this.props;
    const { pathname } = this.state;
    history.push({
      pathname,
      search: query,
    });
  }

  /**
   * Given a parameter, return the query on state with the parameter removed.
   *
   * @param {String} param - A url search query parameter.
   * @return {String} Query string with parameter removed.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   */
  cleanQuery(param) {
    const { query } = this.state;
    const regEx = new RegExp(
      `^${param}=[0,1]&?|&${param}=[0,1]|^${param}=[A-z|+.-]+|&${param}=[A-z|+.-]+`,
      'i',
    );
    const cleanedQuery = query.replace(regEx, '');
    return cleanedQuery === '' ? 'page=1' : cleanedQuery;
  }

  /**
   * On Change event handler for select style filters. Given the select element name and value,
   * create a new query to update the page URL and update the state with the new value.
   *
   * @param {String} value - Select element value.
   * @param {String} name - Select element name.
   */
  handleSelect(value, name) {
    const valStr = `&${name}=${value.map(val => val.value).join('|')}`;
    const newQuery = `${this.cleanQuery(name)}${value.length !== 0 ? valStr : ''}`;

    this.setQuery(newQuery);
    this.setState({ [name]: value });
  }

  /**
   * On Change event handler for toggle style filters. Given the name and checked field from
   * the event target, create a new query to update the page URL and update the state with
   * the new value.
   *
   * @param {Event} event - Event object for change event.
   */
  handleSwitch(event) {
    const { name, checked } = event.target;
    const newQuery = `${this.cleanQuery(name)}&${name}=${checked ? 1 : 0}`;

    this.setQuery(newQuery);
    this.setState({ [name]: checked });
  }

  /**
   * On Click event handler for toggle filters enable/disable button. Given the name and the
   * inner HTML of the event target, create a new query to update the page URL and update the
   * state with the new value.
   *
   * @param {Event} event - Event object for change event.
   */
  handleSwitchEnable(event) {
    let { innerHTML } = event.target;
    let newQuery = '';
    const name = event.currentTarget.dataset.filterName;
    const enable = innerHTML === ENABLE;

    if (enable) {
      // eslint-disable-next-line react/destructuring-assignment
      newQuery = `${this.cleanQuery(name)}&${name}=${this.state[FILTERS[name].eleName] ? 1 : 0}`;
    } else {
      newQuery = `${this.cleanQuery(name)}`;
    }

    innerHTML = enable ? DISABLE : ENABLE;
    this.setQuery(newQuery);
    this.setState({ [event.currentTarget.name]: enable });
  }

  /**
   * Render method.
   * Build the Developer List/Browse page including filter/sort/pagination controls and a list
   * of seekers.
   *
   * @return {HTML} A responsive grid with filters in the left column and sort, pagination links
   * and the list of seekers in the right column.
   */
  render() {
    const {
      desiredTitle,
      topSkills,
      addSkills,
      familiar,
      acclaim,
      acclaimSwitch,
      github,
      githubSwitch,
      linkedIn,
      linkedInSwitch,
      portfolio,
      portfolioSwitch,
      resume,
      resumeSwitch,
      projects,
      projectsSwitch,
      experience,
      experienceSwitch,
      education,
      educationSwitch,
      sort,
      seekers,
      pages,
      currentPage,
      pathname,
      query,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container className={classes.mainContainer} spacing={24}>
          <Grid item className={classes.sideBar} xs={3} data-aos="fade-right">
            <Select
              placeholder={FILTERS.desiredTitle.placeholder}
              value={desiredTitle}
              className={classes.select}
              options={jobTitleSelectOptions}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value => this.handleSelect(value, FILTERS.desiredTitle.eleName)}
              isMulti
            />
            <Select
              placeholder={FILTERS.topSkills.placeholder}
              value={topSkills}
              className={classes.select}
              options={techSkillsSelectOptions}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value => this.handleSelect(value, FILTERS.topSkills.eleName)}
              isMulti
            />
            <Select
              placeholder={FILTERS.addSkills.placeholder}
              value={addSkills}
              className={classes.select}
              options={techSkillsSelectOptions}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value => this.handleSelect(value, FILTERS.addSkills.eleName)}
              isMulti
            />
            <Select
              placeholder={FILTERS.familiar.placeholder}
              value={familiar}
              className={classes.select}
              options={techSkillsSelectOptions}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              styles={selectCustomStyles}
              onChange={value => this.handleSelect(value, FILTERS.familiar.eleName)}
              isMulti
            />
            <FilterToggle
              filter={FILTERS.acclaim}
              isChecked={acclaim}
              isEnabled={acclaimSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.projects}
              isChecked={projects}
              isEnabled={projectsSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.experience}
              isChecked={experience}
              isEnabled={experienceSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.education}
              isChecked={education}
              isEnabled={educationSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.github}
              isChecked={github}
              isEnabled={githubSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.portfolio}
              isChecked={portfolio}
              isEnabled={portfolioSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.linkedIn}
              isChecked={linkedIn}
              isEnabled={linkedInSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
            <FilterToggle
              filter={FILTERS.resume}
              isChecked={resume}
              isEnabled={resumeSwitch}
              onCheck={this.handleSwitch}
              onEnable={this.handleSwitchEnable}
            />
          </Grid>
          <Grid item className={classes.cardBar} xs={9}>
            <Select
              placeholder={FILTERS.sort.placeholder}
              value={sort}
              className={classes.select}
              options={sortSelectOptions}
              closeMenuOnSelect={false}
              components={makeAnimated()}
              onChange={value => this.handleSelect(value, FILTERS.sort.eleName)}
              isMulti
            />
            {this.state.seekers.length !== 0 && this.state.seekers.map(seeker => (
              // eslint-disable-next-line no-underscore-dangle
              <DevProfileCard key={seeker._id} seeker={seeker} />
            ))}
            {this.state.seekers.length !== 0 && (
              <Pagination
                pages={pages}
                currentPage={currentPage}
                pathname={pathname}
                query={query}
              />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

DevList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(DevList);
