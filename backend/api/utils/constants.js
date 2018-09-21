/**
 * @file Settings for Developer Profiles API
 */

/**
 * @constant
 * @type {String}
 */
const SEEKERS_API_PATH = '/api/seekers';

/**
 * @constant
 * @type {Integer}
 */
const PAGINATION_LIMIT = 10;

/**
 * @constant
 * @type {Object}
 */
const SORT_OPTIONS = {
  default: '_id',
  name: 'lastName',
  location: 'currentLocation',
};

/**
 * @constant
 * @type {Object}
 */
const FILTER_VALUE = {
  desiredTitle: 'desiredTitle',
  location: 'currentLocation',
};

/**
 * @constant
 * @type {Object}
 */
const FILTER_BOOLEAN = {
  github: 'github',
  linkedin: 'linkedin',
  portfolio: 'portfolio',
  resume: 'resume',
  acclaim: 'acclaimBadge',
  projects: 'projects',
  experience: 'experience',
  education: 'education',
};

/**
 * @constant
 * @type {Object}
 */
const FILTER_ARRAY = {
  places: 'placesInterested',
  topSkills: 'topSkills',
  addSkills: 'additionalSkills',
  familiar: 'familiarWith',
};

module.exports = {
  PAGINATION_LIMIT,
  SEEKERS_API_PATH,
  SORT_OPTIONS,
  FILTER_VALUE,
  FILTER_BOOLEAN,
  FILTER_ARRAY,
};
