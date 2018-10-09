const faker = require('faker');
const bcrypt = require('bcrypt');
const { generateJSONFile } = require('./utils/generateJSONFile');
const { getProjects } = require('./utils/getProjectSchema');
const { getRandomInt } = require('./utils/getRandomInt');
const { getCity, getCities } = require('./datasets/cities');
const { getEmail } = require('./datasets/emails');
const { faces } = require('./datasets/faces');
const { getJobTitle } = require('./datasets/jobTitles');
const { getSkills } = require('./datasets/skills');
const { tracks } = require('./datasets/tracks');

const avatars = faker.helpers.shuffle(faces);
const password = 'Password123&';
const salt = bcrypt.genSaltSync(12);
const passwordHash = bcrypt.hashSync(password, salt);
const seekers = [];

faker.locale = 'en_US';

/**
 * @todo experienceSchema -> expreience
 * @todo educationSchema -> education
 */

const getSummary = (blank) => {
  const rand = Math.random();
  const maxLength = 128;
  const summary = faker.lorem.sentences(3);
  const trimmedSummary = summary.length > maxLength ? `${summary.substring(0, maxLength - 1)}.` : summary;

  return blank && (rand >= 0 && rand < blank / 100) ? '' : trimmedSummary;
};

const getGitHub = (firstName, lastName, blank) => {
  const rand = Math.random();
  const github = `https://github.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}`;

  return blank && (rand >= 0 && rand < blank / 100) ? '' : github;
};

const getLinkedIn = (firstName, lastName, blank) => {
  const rand = Math.random();
  const linkedIn = `https://www.linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`;

  return blank && (rand >= 0 && rand < blank / 100) ? '' : linkedIn;
};

const getPortfolio = (firstName, lastName, blank) => {
  const rand = Math.random();
  const portfolio = `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.com`;

  return blank && (rand >= 0 && rand < blank / 100) ? '' : portfolio;
};

const getSeeker = (avatar) => {
  const track = tracks[getRandomInt(0, tracks.length - 1)];
  const firstName = faker.name.firstName(avatar.gender);
  const lastName = faker.name.lastName(avatar.gender);
  const skills = getSkills(track);

  return {
    firstName,
    lastName,
    img: avatar.avatar,
    password: passwordHash,
    email: getEmail(firstName, lastName, 0),
    currentTitle: faker.name.jobTitle(),
    desiredTitle: getJobTitle(track, 0),
    currentLocation: getCity(10, 0),
    summary: getSummary(50),
    github: getGitHub(firstName, lastName, 30),
    linkedIn: getLinkedIn(firstName, lastName, 40),
    portfolio: getPortfolio(firstName, lastName, 70),
    placesInterested: getCities(0),
    topSkills: skills.topSkills,
    additionalSkills: skills.additionalSkills,
    familiarWith: skills.familiarWith,
    projects: getProjects(5, firstName, lastName, 10),
    experience: [],
    education: [],
  };
};

for (let i = 0; i < 1; i += 1) {
  seekers.push(getSeeker(avatars[0]));
}

generateJSONFile('./Seekers.json', seekers);
