const PAGINATION_LIMIT = 10;
const SORT_OPTIONS = {
  default: '_id',
  name: 'lastName',
  location: 'currentLocation',
};
const SEEKERS_API_PATH = '/api/seekers';

module.exports = {
  PAGINATION_LIMIT,
  SEEKERS_API_PATH,
  SORT_OPTIONS,
};
