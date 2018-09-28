/**
 * @file Settings for Developer Profiles Frontend
 */

/**
 * @constant
 * @type {String}
 */
export const ENABLE = 'Enable';

/**
 * @constant
 * @type {String}
 */
export const DISABLE = 'Disable';

/**
 * @constant
 * @type {Object}
 */
export const SORT = {
  asc: 'A-Z',
  dsc: 'Z-A'
};

/**
 * @constant
 * @type {Object}
 */
export const FILTERS = {
  sort: {
    type: 'select',
    name: 'sort',
    placeholder: 'Sort By...'
  },
  desiredTitle: {
    type: 'select',
    name: 'desiredTitle',
    placeholder: 'Select Job Title...'
  },
  topSkills: {
    type: 'select',
    name: 'topSkills',
    placeholder: 'Proficient With...'
  },
  addSkills: {
    type: 'select',
    name: 'addSkills',
    placeholder: 'Knowledgeable With...'
  },
  familiar: {
    type: 'select',
    name: 'familiar',
    placeholder: 'Familiar With...'
  },
  acclaim: {
    type: 'toggle',
    displayName: 'Lambda Badge',
    eleName: 'acclaim',
    toggleName: 'acclaimSwitch'
  },
  github: {
    type: 'toggle',
    displayName: 'GitHub',
    eleName: 'github',
    toggleName: 'githubSwitch'
  },
  linkedIn: {
    type: 'toggle',
    displayName: 'LinkedIn',
    eleName: 'linkedIn',
    toggleName: 'linkedInSwitch'
  },
  portfolio: {
    type: 'toggle',
    displayName: 'Portfolio',
    eleName: 'portfolio',
    toggleName: 'portfolioSwitch'
  },
  resume: {
    type: 'toggle',
    displayName: 'Resume',
    eleName: 'resume',
    toggleName: 'resumeSwitch'
  },
  projects: {
    type: 'toggle',
    displayName: 'Projects',
    eleName: 'projects',
    toggleName: 'projectsSwitch'
  },
  experience: {
    type: 'toggle',
    displayName: 'Experience',
    eleName: 'experience',
    toggleName: 'experienceSwitch'
  },
  education: {
    type: 'toggle',
    displayName: 'Education',
    eleName: 'education',
    toggleName: 'educationSwitch'
  }
};

/**
 * @constant
 * @type {Object}
 */
export const PAGINATION_SETTINGS = {
  maxPageLinks: 7,
  pageLimit: 10
};
