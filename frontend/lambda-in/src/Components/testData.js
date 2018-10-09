/**
 * @file Test data
 */

/**
 * User test data.
 * @const
 * @type {object}
 */
export const DEV_TEST_DATA = {
  _id: '5ba390842afca2160cb0ffbe',
  __v: 0,
  firstName: 'Jean Surkouf',
  lastName: 'Ariza Varela',
  summary: 'CS and Software development passionate.',
  email: 'reg@c14.com',
  password: '$2b$12$r/CTYDAaLzq7VtWMwaFNdOJhPYf/9/Py25irLgUfcZWsti2xHLgN6',
  desiredTitle: 'Full Stack Software Developer',
  topSkills: ['React', 'TDD', 'LESS', 'CS', 'HTML', 'HAPPY_CODING'],
  additionalSkills: ['Passionate', 'Happy'],
  familiarWith: ['Python', 'C', 'Djangl'],
  github: 'https://github.com/talent_developer',
  linkedin: 'Linkedin/talent_developer',
  portfolio: 'portfolio.talent_developer',
  placesInterested: [
    {
      loc: {
        coordinates: ['65.98', '-55.666'],
        type: 'Point',
      },
      _id: '5ba39769cc47111861ac5574',
      place: 'Califirnia',
    },
    {
      loc: {
        coordinates: ['-0.666', '-66.666'],
        type: 'Point',
      },
      _id: '5ba39769cc47111861ac5573',
      place: 'Canada',
    },
  ],

  projects: [
    {
      tech: ['NODE', 'Express', 'Mongoose', 'React'],
      _id: '5bbcc2aee991c12f8e4bde3a',
      title: 'Dev profiles',
      description: 'A meeting place for employers and talent developers',
      img: '/nice.img.edit',
      link: 'go.to.project.com',
      repo: 'github.my-repo',
    },
    {
      tech: ['JavaScript', 'Express', 'Mongoose', 'NPM'],
      _id: '5bbcc2aee991c12f8e4bde39',
      title: 'Router Factroy',
      description: 'A DRY library for express-mongoose',
      img: '/nice.img',
      link: 'go.to.project.com',
      repo: 'github.my-repo',
    },
  ],
  experience: [
    {
      _id: '5bbcc2aee991c12f8e4bde3d',
      title: 'LCAI',
      company: 'UAM research group',
      location: {
        loc: {
          coordinates: ['-0.666', '-66.666'],
          type: 'Point',
        },
        _id: '5bb748545cdfe308de503a2b',
        place: 'Madrid',
      },
      headline: 'Wedsite for an research group.',
      description:
        'A dynamic website with no know CRM and Backend hosted in google Spreadsheet.',
      startYear: '2018-09-27T19:10:21.809Z',
      endYear: '2018-09-27T19:10:21.809Z',
    },
    {
      _id: '5bbcc2aee991c12f8e4bde3b',
      title: 'Developer profiles',
      company: 'Lambda',
      location: {
        loc: {
          coordinates: ['10.666', '43.666'],
          type: 'Point',
        },
        _id: '5bb748545cdfe308de503a29',
        place: 'Califormia',
      },
      headline: 'Meeting point for employers looking for talent developers.',
      description: 'A place to match employer needs with a talent developer',
      startYear: '2018-09-27T19:10:21.809Z',
      endYear: '2018-10-12T19:10:21.809Z',
    },
  ],
  education: [
    {
      _id: '5bbcc2aee991c12f8e4bde40',
      school: 'Lambda School',
      degree: 'Software developer',
      fieldOfStudy: 'CS',
      startYear: '2018-03-31T22:00:00.000Z',
      endYear: '2018-10-11T22:00:00.000Z',
      description:
        'A CS and Software development master with a focus on web technologies.',
    },
    {
      _id: '5bbcc2aee991c12f8e4bde3f',
      school: 'UNED',
      degree: 'Economics',
      fieldOfStudy: 'Social sciences',
      startYear: '2012-03-31T22:00:00.000Z',
      endYear: '2017-10-11T22:00:00.000Z',
      description: 'Economics studies.',
    },
  ],
};

export const EMPLOYER_TEST_DATA = {};
