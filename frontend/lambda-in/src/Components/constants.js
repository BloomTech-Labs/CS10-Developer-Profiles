export const ENABLE = 'Enable';
export const DISABLE = 'Disable';

export const SORT = {
  asc: 'A-Z',
  dsc: 'Z-A'
};

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
    label: 'Lambda Badge',
    name: 'acclaim',
    toggleName: 'acclaimSwitch'
  },
  github: {
    type: 'toggle',
    label: 'GitHub',
    name: 'github',
    toggleName: 'githubSwitch'
  },
  linkedIn: {
    type: 'toggle',
    label: 'LinkedIn',
    name: 'linkedIn',
    toggleName: 'linkedInSwitch'
  },
  portfolio: {
    type: 'toggle',
    label: 'Portfolio',
    name: 'portfolio',
    toggleName: 'portfolioSwitch'
  },
  resume: {
    type: 'toggle',
    label: 'Resume',
    name: 'resume',
    toggleName: 'resumeSwitch'
  },
  projects: {
    type: 'toggle',
    label: 'Projects',
    name: 'projects',
    toggleName: 'projectsSwitch'
  },
  experience: {
    type: 'toggle',
    label: 'Experience',
    name: 'experience',
    toggleName: 'experienceSwitch'
  },
  education: {
    type: 'toggle',
    label: 'Education',
    name: 'education',
    toggleName: 'educationSwitch'
  }
};

export const PAGINATION_SETTINGS = {
  maxPageLinks: 7,
  pageLimit: 10
};
