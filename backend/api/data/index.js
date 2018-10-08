const faker = require('faker');
const { getRandomInt } = require('./utils/getRandomInt');
const { emailProviders } = require('./datasets/emailProviders');
const { faces } = require('./datasets/faces');
const { jobTitles } = require('./datasets/jobTitles');
const { tracks } = require('./datasets/tracks');

const avatars = faker.helpers.shuffle(faces);

/**
 * @todo location schema -> currentLocation, placesInterested
 * @todo skillSchema -> topskills, additionalSkills, familiarWith
 * @todo projectsSchema -> projects
 * @todo experienceSchema -> expreience
 * @todo educationSchema -> education
 * @todo randomize missing data
 * @todo hash password
 */

const getSeeker = (avatar) => {
  const track = tracks[getRandomInt(0, tracks.length - 1)];
  const titles = jobTitles[track];

  const firstName = faker.name.firstName(avatar.gender);
  const lastName = faker.name.lastName(avatar.gender);
  const summary = faker.lorem.sentences(3);

  return {
    track,
    firstName,
    lastName,
    img: avatar.avatar,
    password: 'Password123&',
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
      emailProviders[getRandomInt(0, emailProviders.length - 1)]
    }.com`,
    currentTitle: faker.name.jobTitle(),
    desiredTitle: titles[getRandomInt(0, titles.length - 1)],
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
