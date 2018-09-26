import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const PAGINATION_SETTINGS = {
  maxPageLinks: 7,
  pageLimit: 10
};

const styles = {};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPageLinks: PAGINATION_SETTINGS.maxPageLinks,
      lowLimit: PAGINATION_SETTINGS.maxPageLinks - 1,
      highLimit: this.props.pages - PAGINATION_SETTINGS.maxPageLinks + 2,
      pageLinks: [],
      cleanQuery: this.cleanQuery(this.props.query)
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

    return (
      <ul className={classes.pagination}>
        {pageLinks.map(page => (
          <li key={page} className={classes.pageItem}>
            <Link
              to={`${this.props.pathname}?page=${page}${this.state.cleanQuery}`}
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
