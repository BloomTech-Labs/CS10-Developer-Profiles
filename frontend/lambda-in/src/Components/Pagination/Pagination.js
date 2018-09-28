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
 */
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPageLinks: PAGINATION_SETTINGS.maxPageLinks,
      lowLimit: PAGINATION_SETTINGS.maxPageLinks - 1,
      highLimit: this.props.pages - PAGINATION_SETTINGS.maxPageLinks + 2,
      pageLinks: []
    };
  }

  cleanQuery = query => {
    const cleanQuery = query.replace(/^page=[0-9]+&?|&page=[0-9]+/i, '');
    return cleanQuery === '' ? cleanQuery : `&${cleanQuery}`;
  };

  getAllPageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getLowRangePageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.state.lowLimit; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getHighRangePageLinks = () => {
    const pageLinks = [];

    for (let i = this.state.highLimit; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getMidRangePageLinks = () => {
    const pageLinks = [];
    const start =
      this.props.currentPage - Math.floor((this.state.maxPageLinks - 1) / 2);

    for (let i = start; i < start + this.state.maxPageLinks; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getPageLinks = () => {
    if (this.props.pages <= this.state.maxPageLinks)
      return this.getAllPageLinks();

    if (this.props.currentPage < this.state.lowLimit)
      return this.getLowRangePageLinks();

    if (this.props.currentPage > this.state.highLimit)
      return this.getHighRangePageLinks();

    return this.getMidRangePageLinks();
  };

  handleClick = (event, page) => {
    /**
     * @todo Replace with smooth scroll
     */
    window.scrollTo(0, 0);
  };

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
