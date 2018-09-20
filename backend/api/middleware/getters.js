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

const getNextPage = (currentPage, totalPages, totalResults) => {
  if (totalResults < PAGINATION_LIMIT || currentPage === totalPages) return null;
  if (!currentPage || currentPage === 1) return 2;
  return currentPage + 1;
};

const getPrevPage = (currentPage) => {
  if (!currentPage || currentPage === 1) return null;
  return currentPage - 1;
};

const getSkipAmount = (currentPage) => {
  const page = currentPage || 1;
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
  const regex = new RegExp(val.replace(/\+/g, ' '), 'i');
  return regex;
};

const getFilterByBoolean = val => ({ $exists: val });

const getFilterByArrayValue = (val) => {
  const values = val.split('|').map(v => v.replace(',', ', '));
  return { $in: values };
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
          next: nextPage ? `${SEEKERS_API_PATH}?page=${nextPage}` : null,
          prev: prevPage ? `${SEEKERS_API_PATH}?page=${prevPage}` : null,
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
