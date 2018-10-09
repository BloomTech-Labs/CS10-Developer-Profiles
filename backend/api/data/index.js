const faker = require('faker');
const bcrypt = require('bcrypt');
const { getRandomInt } = require('./utils/getRandomInt');
const { getEmail } = require('./datasets/emails');
const { faces } = require('./datasets/faces');
const { getJobTitle } = require('./datasets/jobTitles');
const { tracks } = require('./datasets/tracks');

const avatars = faker.helpers.shuffle(faces);
const password = 'Password123&';
const salt = bcrypt.genSaltSync(12);
const passwordHash = bcrypt.hashSync(password, salt);

faker.locale = 'en_US';

/**
 * @todo location schema -> currentLocation, placesInterested
 * @todo skillSchema -> topskills, additionalSkills, familiarWith
 * @todo projectsSchema -> projects
 * @todo experienceSchema -> expreience
 * @todo educationSchema -> education
 * @todo randomize missing data
 */

const getSeeker = (avatar) => {
  const track = tracks[getRandomInt(0, tracks.length - 1)];

  const firstName = faker.name.firstName(avatar.gender);
  const lastName = faker.name.lastName(avatar.gender);
  const summary = faker.lorem.sentences(3);

  return {
    track,
    firstName,
    lastName,
    img: avatar.avatar,
    password: passwordHash,
    email: getEmail(firstName, lastName, 0),
    currentTitle: faker.name.jobTitle(),
    desiredTitle: getJobTitle(track, 0),
    currentLocation: 'locationSchema',
    summary: summary.length > 128 ? `${summary.substring(0, 127)}.` : summary,
    github: `https://github.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
    linkedIn: `https://www.linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    portfolio: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.com`,
    placesInterested: '[locationSchema]',
    topSkills: '[skillSchema]',
    additionalSkills: '[skillSchema]',
    familiarWith: '[skillSchema]',
    projects: '[projectsSchema]',
    experience: '[experienceSchema]',
    education: '[educationSchema]',
  };
};

const seekers = [];

for (let i = 0; i < 1; i += 1) {
  seekers.push(getSeeker(avatars[0]));
}

console.log(seekers);
