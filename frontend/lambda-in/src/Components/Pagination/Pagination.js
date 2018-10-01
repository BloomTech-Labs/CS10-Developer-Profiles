import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PAGINATION_SETTINGS } from '../constants';

const styles = {};

/**
 * Pagination component
 *
 * @description A component that generates links to navigate through a list of pages.
 * @class A React class component
 * @prop {Integer} maxPageLinks - The maximum number of page links to generate.
 * @prop {Integer} lowLimit - Tha max point the current page can be at to generate a low page range.
 * @example
 *  Ex: If current page is less than low limit, the page range will always be 1,2,3,4,5,6
 * @prop {Integer} highLimit - The min point the current page can be at to generate a high page range.
 * @example
 *  Ex: If current page is more than high limit, the page range will always be 34,35,36,37,38,39
 * @prop {Array} pageLinks - Range of page links to generate.
 *
 * @see {@link https://reacttraining.com/react-router/web/api/Link } for the Link API.
 */
class Pagination extends Component {
  /**
   * Create a Pagination component
   *
   * @param {Object} props - Component properties.
   * @param {Integer} props.count - The total number of records being displayed.
   * @param {Integer} props.pages - The total number of pages that should exist.
   * @param {Integer} props.currentPage - The current page number.
   * @param {String} props.pathName - The current page url pathname.
   * @example
   *  '/dev-list'
   * @param {String} props.query - The current page url search query.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   */
  constructor(props) {
    super(props);
    this.state = {
      maxPageLinks: PAGINATION_SETTINGS.maxPageLinks,
      lowLimit: PAGINATION_SETTINGS.maxPageLinks - 1,
      highLimit: this.props.pages - PAGINATION_SETTINGS.maxPageLinks + 2,
      pageLinks: []
    };
  }

  /**
   * Given a url search query, return the query string with the page parameter removed.
   *
   * @param {String} query - A url search query.
   * @example
   *  'page=2&desiredTitle=Front+End|Back+End'
   * @return {String} Query string with page parameter removed.
   */
  cleanQuery = query => {
    const cleanQuery = query.replace(/^page=[0-9]+&?|&page=[0-9]+/i, '');
    return cleanQuery === '' ? cleanQuery : `&${cleanQuery}`;
  };

  /**
   * Generate a range from 1 to the total number of pages and return the list in an array.
   *
   * @return {Array} Array with page range.
   */
  getAllPageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  /**
   * Generate a range from 1 to the lowLimit and return the list in an array.
   *
   * @return {Array} Array with page range.
   */
  getLowRangePageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.state.lowLimit; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  /**
   * Generate a range from the highLimit to the total number of pages and return the list in an array.
   *
   * @return {Array} Array with page range.
   */
  getHighRangePageLinks = () => {
    const pageLinks = [];

    for (let i = this.state.highLimit; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  /**
   * Determine the start point for the page range and generate a range from the start to the max number
   * of page linkes and return list in an array.
   *
   * @return {Array} Array with page range.
   */
  getMidRangePageLinks = () => {
    const pageLinks = [];
    const start =
      this.props.currentPage - Math.floor((this.state.maxPageLinks - 1) / 2);

    for (let i = start; i < start + this.state.maxPageLinks; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  /**
   * Using the passed in props pages and currentPage and the maxPageLinks, lowLimit and highLimit on the
   * state, determine which method to call to generate the appropriate page range. Return the page range as
   * an array of integers.
   *
   * @return {Array} Array with page range
   */
  getPageLinks = () => {
    if (this.props.pages <= this.state.maxPageLinks)
      return this.getAllPageLinks();

    if (this.props.currentPage < this.state.lowLimit)
      return this.getLowRangePageLinks();

    if (this.props.currentPage > this.state.highLimit)
      return this.getHighRangePageLinks();

    return this.getMidRangePageLinks();
  };

  /**
   * Click event handler
   * When called, scroll the window up to the top of the page.
   */
  handleClick = () => {
    /**
     * @todo Replace with smooth scroll
     */
    window.scrollTo(0, 0);
  };

  /**
   * Render method.
   * Get the range of page links and a clean query string and return HTML for the page links.
   *
   * @return {HTML} HTML unordered list of page links
   */
  render() {
    const { classes } = this.props;
    const pageLinks = this.getPageLinks();
    const cleanQuery = this.cleanQuery(this.props.query);

    return (
      <ul className={classes.pagination}>
        {pageLinks.map(page => (
          <li key={page} className={classes.pageItem}>
            <Link
              to={`${this.props.pathname}?page=${page}${cleanQuery}`}
              onClick={event => this.handleClick(event, page)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.string
};

export default withStyles(styles)(Pagination);
