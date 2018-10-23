/**
 * @file Implement pagination, sorting and filtering for Seekers
 */

const Seeker = require('../models/Seeker/Seeker.model');
const { sendErr, sendRes } = require('../utils/apiResponses');
const {
  PAGINATION_LIMIT,
  SORT_OPTIONS,
  FILTER_VALUE,
  FILTER_BOOLEAN,
  FILTER_ARRAY,
  FILTER_NEAR,
  EARTH_RADIUS,
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
 * @return {(Null|Integer)} Next page index.
 */
const getNextPage = (current, total, count) => {
  if (isNextPageNull(current, total, count)) return null;
  return isFirstPage(current) ? 2 : current + 1;
};

/**
 * Given the current page, return the previous page
 *
 * @param current {Integer} Current page number.
 * @return {(Null|Integer)}} Prev page index.
 */
const getPrevPage = current => (isFirstPage(current) ? null : current - 1);

/**
 * Given a page number, build and return the correct url string, including any current query
 * parameters.
 *
 * @param page {Integer} Page number.
 * @param query {Object} Active query parameters.
 * @example
 *  { page: '18', sort: 'location|name' }
 * @return {String} Url string.
 * @example
 *  /api/seekers?page=17&desiredTitle=Front+End&sort=location|name
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

/**
 * Given the current page, determine how many documents should be skipped to only show the next set
 * of documents as determined by the PAGINATION_LIMIT
 *
 * @param current {Integer} Current page number.
 * @return {Integer} Number of documents to skip.
 */
const getSkipAmount = (current) => {
  const page = current || 1;
  return (page - 1) * PAGINATION_LIMIT;
};

/**
 * Given a string, return the corresponding model field to sort by. If the string cannot be mapped
 * to a field, return the default sort field.
 *
 * @param sortOption {String} Sort value.
 * @return {String} Model data field name.
 */
const getSortField = (sortOption) => {
  const field = sortOption.startsWith('-') ? sortOption.substring(1) : sortOption;
  return SORT_OPTIONS[field] ? SORT_OPTIONS[field] : SORT_OPTIONS.default;
};

/**
 * Given a raw sort query string, parse it to determine the sort fields and sort order of each and
 * return the data as an object
 *
 * @param sortQuery {String} Raw sort query string.
 * @example
 *  location|name
 * @return {Object} Mongo sort options.
 * @example
 *  { currentLocation: 1, lastName: 1 }
 */
const getSortOptions = (sortQuery) => {
  const query = sortQuery.split('|');
  const sortOptions = {};

  query.forEach((option) => {
    const sort = getSortField(option);
    sortOptions[sort] = option.startsWith('-') ? -1 : 1;
  });

  return sortOptions;
};

/**
 * Given a string fragment, return it as a regular expression with all '+' replaced with ' '.
 *
 * @param val {String} Raw filter string.
 * @example
 *  Front+End+Engineer
 * @return {RegExp} Filter value as a regular expression.
 * @example
 *  /Front End Engineer/
 */
const getFilterByValue = (val) => {
  const regex = new RegExp(val.replace(/\+/g, ' '));
  return regex;
};

/**
 * Given a boolean, return an object with the Mongo operator $exists set to the boolean.
 *
 * @param val {Boolean} 0 or 1.
 * @return {Object} Mongo object with $exists set.
 * @example
 *  { '$exists': 1 }
 */
const getFilterByBoolean = val => ({ $exists: val });

/**
 * Given a string fragment, parse it for individual values and return an object with the Mongo
 * operator $all set to an array of regular expressions representing each filter value.
 *
 * @param val {String} Raw filter string.
 * @example
 *  CA|FL
 * @return {Object} An object with $all set to an array of RegEx.
 * @example
 *  { '$all': [ /CA/, /FL/ ] }
 */
const getFilterByArrayValue = (val) => {
  const values = val.split('|').map((v) => {
    const regex = new RegExp(v.replace(/\+/g, ' '));
    return regex;
  });

  return { $all: values };
};

/**
 * Given a string fragment, parse it for the longitude, latitude, and miles and return an object
 * with the Mongo operator $geoWithin set to search for all records within given miles.
 *
 * @param val {String} Raw filter string.
 * @example
 *  -73.93414657|40.82302903|5
 * @return {Object} An object with $geoWithin search query.
 * @example
 *  { $geoWithin: { $centerSphere: [ [ -73.93414657, 40.82302903 ], 5 / 3963.2 ] } } }
 */
const getFilterByGeoWithin = (val) => {
  const geoData = val.split('|');
  const coordinates = [+geoData[0], +geoData[1]];
  const distance = +geoData[2] / EARTH_RADIUS;

  return { $geoWithin: { $centerSphere: [coordinates, distance] } };
};

/**
 * Iterate through an object of raw filter parameters and if set, parse the data and return the
 * filter parameters in an object. Returns an empty object if no fields are set.
 *
 * @param query {Object} Raw filter parameters set to either a string, boolean or undefined.
 * @return {Object} Mongo find options.
 * @example
 *  { placesInterested: { '$all': [ /Miami, FL/ ] } }
 */
const getFilters = (query) => {
  const filters = {};

  Object.keys(query).forEach((key) => {
    if (query[key]) {
      if (FILTER_VALUE[key]) filters[FILTER_VALUE[key]] = getFilterByValue(query[key]);
      if (FILTER_BOOLEAN[key]) filters[FILTER_BOOLEAN[key]] = getFilterByBoolean(+query[key]);
      if (FILTER_ARRAY[key]) filters[FILTER_ARRAY[key]] = getFilterByArrayValue(query[key]);
      if (FILTER_NEAR[key]) filters[FILTER_NEAR[key]] = getFilterByGeoWithin(query[key]);
    }
  });

  return filters;
};

/**
 * Middleware to circumvent the Router Factory's default GET behaviour. Applies pagination,
 * sorting and filtering to the GET Seeker results. Builds an object holding the filter options
 * and then runs a where().countDocuments() to determine how many documents match the filters to
 * be applied. The count is used with the PAGINATION_LIMIT to setup the page options. Finally a
 * find() is run with the filter, sort and page options. Page metadata is added to the results
 * which are sent back with a 200 status code.
 *
 * If the pagination errors, an error is sent back.
 *
 * If an invalid page is passed in, an error is sent back.
 *
 * @param model {Model} A Mongoose model.
 * @param req {Object} HTTP request object.
 * @param res {Object} HTTP response object.
 */
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

    Seeker.find(
      filters,
      { password: 0, __v: 0 },
      {
        sort: getSortOptions(sort),
        skip: getSkipAmount(+page),
        limit: PAGINATION_LIMIT,
      },
    )
      .then((seekers) => {
        const nextPage = getNextPage(+page, pages, count);
        const prevPage = getPrevPage(+page);

        sendRes(res, '200', {
          count,
          pages,
          current: +page || 1,
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
