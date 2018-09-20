/**
 * Implement pagination, sorting and filtering for Seekers
 */
const Seeker = require('../models/Seeker/Seeker.model');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { PAGINATION_LIMIT, SORT_OPTIONS, SEEKERS_API_PATH } = require('../utils/constants');

const getNextPage = (currentPage, totalPages) => {
  if (!currentPage || currentPage === 1) return 2;
  if (currentPage === totalPages) return null;
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
  const query = sortQuery.split(',');
  const sortOptions = {};

  query.forEach((option) => {
    const sort = getSortField(option);
    sortOptions[sort] = option.startsWith('-') ? -1 : 1;
  });

  return sortOptions;
};

const getSeekers = (model, req, res) => {
  const { page } = req.query;
  const sort = req.query.sort || 'default';

  Seeker.estimatedDocumentCount()
    .then((count) => {
      const pages = Math.ceil(count / PAGINATION_LIMIT);

      if (page > pages) return sendErr(res, '404', 'Page number is invalid.');

      Seeker.find({}, null, {
        sort: getSortOptions(sort),
        skip: getSkipAmount(+page),
        limit: PAGINATION_LIMIT,
      })
        .then((seekers) => {
          const nextPage = getNextPage(+page, pages);
          const prevPage = getPrevPage(+page);

          sendRes(res, '200', {
            count,
            next: nextPage ? `${SEEKERS_API_PATH}?page=${nextPage}` : null,
            prev: prevPage ? `${SEEKERS_API_PATH}?page=${prevPage}` : null,
            results: seekers,
          });
        })
        .catch(err => sendErr(res, err, 'The list of seekers could not be retrieved.'));

      return null;
    })
    .catch(err => sendErr(res, err, 'The list of seekers could not be retrieved.'));
};

module.exports = {
  getSeekers,
};
