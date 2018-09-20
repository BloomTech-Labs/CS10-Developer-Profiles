const SEEKERS_API_PATH = '/api/seekers';
const PAGINATION_LIMIT = 10;

const SORT_OPTIONS = {
  default: '_id',
  name: 'lastName',
  location: 'currentLocation',
};

const FILTER_VALUE = {
  desiredTitle: 'desiredTitle',
  location: 'currentLocation',
};

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

module.exports = {
  PAGINATION_LIMIT,
  SEEKERS_API_PATH,
  SORT_OPTIONS,
  FILTER_VALUE,
  FILTER_BOOLEAN,
};
