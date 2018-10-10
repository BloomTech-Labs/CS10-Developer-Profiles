import PropTypes from 'prop-types';

export default PropTypes.shape({
  img: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  currentTitle: PropTypes.string,
  desiredTitle: PropTypes.string,
  currentLocation: PropTypes.shape({
    place: PropTypes.string.isRequired,
    loc: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  summary: PropTypes.string,
  github: PropTypes.string,
  linkedin: PropTypes.string,
  portfolio: PropTypes.string,
  resume: PropTypes.string,
  acclaimBadge: PropTypes.string,
  placesInterested: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string.isRequired,
      loc: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  ),
  topSkills: PropTypes.arrayOf(PropTypes.string),
  additionalSkills: PropTypes.arrayOf(PropTypes.string),
  familiarWith: PropTypes.arrayOf(PropTypes.string),
  socialNetwork: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string,
      link: PropTypes.string,
      repo: PropTypes.string,
      tech: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.shape({
        place: PropTypes.string.isRequired,
        loc: PropTypes.shape({
          coordinates: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      headline: PropTypes.string,
      description: PropTypes.string,
      startYear: PropTypes.string,
      endYear: PropTypes.string,
    }),
  ),
  education: PropTypes.arrayOf(
    PropTypes.shape({
      school: PropTypes.string.isRequired,
      degree: PropTypes.string,
      fieldOfStudy: PropTypes.string.isRequired,
      startYear: PropTypes.string.isRequired,
      endYear: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
});
