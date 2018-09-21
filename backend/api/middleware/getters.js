/**
 * Implement pagination, sorting and filtering for Seekers
 */

const Seeker = require('../models/Seeker/Seeker.model');
const { sendErr, sendRes } = require('../utils/apiResponses');
const {
  PAGINATION_LIMIT,
  SORT_OPTIONS,
  FILTER_VALUE,
  FILTER_BOOLEAN,
  FILTER_ARRAY,
  SEEKERS_API_PATH,
} = require('../utils/constants');

/**
 * Given the current page determine if it is the first page. Return true or false.
 *
 * @param current {Integer} Current page number.
 * @return {Boolean} True/False if current page is first page.
 */
const isFirstPage = current => !current || current === 1;

/**
 * Given the current page, total number of pages and number of documents, determine if the next
 * page is null. Return true or false
 *
 * @param current {Integer} Current page number.
 * @param total {Integer} Total number of pages.
 * @param count {Integer} Number of documents in query.
 * @return {Boolean} True/False if next page is null.
 */
const isNextPageNull = (current, total, count) => count < PAGINATION_LIMIT || current === total;

/**
 * Given the current page, total number of pages and number of documents, return the next page.
 * Returns null if number of documents is less than pagaination limit or current page equals total
 * number of pages
 *
 * @param current {Integer} Current page number.
 * @param total {Integer} Total number of pages.
 * @param count {Integer} Number of documents in query.
 * @return {Null || Integer} Next page index.
 */
const getNextPage = (current, total, count) => {
  if (isNextPageNull(current, total, count)) return null;
  return isFirstPage(current) ? 2 : current + 1;
};

/**
 * Given the current page, return the previous page
 *
 * @param current {Integer} Current page number.
 * @return {Null || Integer} Prev page index.
 */
const getPrevPage = current => (isFirstPage(current) ? null : current - 1);

/**
 * Given a page number, build and return the correct url string, including any current query
 * parameters.
 *
 * @param page {Integer} Page number.
 * @param query {Object} Active query parameters. Ex. { page: '18', sort: 'location|name' }
 * @return {String} /api/seekers?page=17&desiredTitle=Front End&sort=location|name.
 */
const getUrl = (page, query) => {
  const queryStr = [`page=${page}`];

  Object.keys(query).forEach((key) => {
    if (key !== 'page') {
      queryStr.push(`${key}=${query[key].replace(/ /g, '+')}`);
    }
  });

  return `${SEEKERS_API_PATH}?${queryStr.join('&')}`;
};

const getSkipAmount = (current) => {
  const page = current || 1;
  return (page - 1) * PAGINATION_LIMIT;
};

const getSortField = (sortOption) => {
  const field = sortOption.startsWith('-') ? sortOption.substring(1) : sortOption;
  return SORT_OPTIONS[field] ? SORT_OPTIONS[field] : SORT_OPTIONS.default;
};

const getSortOptions = (sortQuery) => {
  const query = sortQuery.split('|');
  const sortOptions = {};

  query.forEach((option) => {
    const sort = getSortField(option);
    sortOptions[sort] = option.startsWith('-') ? -1 : 1;
  });

  return sortOptions;
};

const getFilterByValue = (val) => {
  const regex = new RegExp(val.replace(/\+/g, ' '));
  return regex;
};

const getFilterByBoolean = val => ({ $exists: val });

const getFilterByArrayValue = (val) => {
  const values = val.split('|').map((v) => {
    const regex = new RegExp(v.replace(/,/g, ', '));
    return regex;
  });

  return { $all: values };
};

const getFilters = (query) => {
  const filters = {};

  Object.keys(query).forEach((key) => {
    if (query[key]) {
      if (FILTER_VALUE[key]) filters[FILTER_VALUE[key]] = getFilterByValue(query[key]);
      if (FILTER_BOOLEAN[key]) filters[FILTER_BOOLEAN[key]] = getFilterByBoolean(+query[key]);
      if (FILTER_ARRAY[key]) filters[FILTER_ARRAY[key]] = getFilterByArrayValue(query[key]);
    }
  });

  return filters;
};

const getSeekers = (model, req, res) => {
  const { page } = req.query;
  const sort = req.query.sort || 'default';
  const filters = getFilters({
    desiredTitle: req.query.desiredTitle,
    location: req.query.location,
    github: req.query.github,
    linkedin: req.query.linkedin,
    portfolio: req.query.portfolio,
    resume: req.query.resume,
    acclaim: req.query.acclaim,
    places: req.query.places,
    topSkills: req.query.topSkills,
    addSkills: req.query.addSkills,
    familiar: req.query.familiar,
    projects: req.query.projects,
    experience: req.query.experience,
    education: req.query.education,
  });

  Seeker.where(filters).countDocuments((err, count) => {
    if (err) return sendErr(res, err, 'The list of seekers could not be retrieved.');
    if (count === 0) return sendErr(res, '404', 'No results. Please broaden your search queries.');

    const pages = Math.ceil(count / PAGINATION_LIMIT);

    if (page > pages) return sendErr(res, '404', 'Page number is invalid.');

    Seeker.find(filters, null, {
      sort: getSortOptions(sort),
      skip: getSkipAmount(+page),
      limit: PAGINATION_LIMIT,
    })
      .then((seekers) => {
        const nextPage = getNextPage(+page, pages, count);
        const prevPage = getPrevPage(+page);

        sendRes(res, '200', {
          count,
          next: nextPage ? getUrl(nextPage, req.query) : null,
          prev: prevPage ? getUrl(prevPage, req.query) : null,
          results: seekers,
        });
      })
      .catch(findError => sendErr(res, findError, 'The list of seekers could not be retrieved.'));

    return null;
  });
};

module.exports = {
  getSeekers,
};
