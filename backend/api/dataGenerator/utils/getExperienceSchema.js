const faker = require('faker');
const { getRandomInt } = require('./getRandomInt');
const { getCity } = require('../datasets/cities');

const getExperienceHeadline = (blank) => {
  const rand = Math.random();
  const headline = faker.lorem.words(getRandomInt(3, 5));

  return blank && (rand >= 0 && rand < blank / 100) ? null : headline;
};

const getExperienceDescription = (blank) => {
  const rand = Math.random();
  const description = faker.lorem.sentences(getRandomInt(1, 10));

  return blank && (rand >= 0 && rand < blank / 100) ? null : description;
};

const getExperience = (maxExperience, blank) => {
  const rand = Math.random();
  const numExp = blank && (rand >= 0 && rand < blank / 100) ? 0 : getRandomInt(1, maxExperience);
  const experiences = [];

  for (let i = 0; i < numExp; i += 1) {
    const headline = getExperienceHeadline(70);
    const description = getExperienceDescription(5);
    const endYear = null;
    const experience = {
      title: faker.name.jobTitle(),
      company: faker.company.companyName(),
      location: getCity(0),
      startYear: faker.date.past(),
    };

    if (headline) experience.headline = headline;
    if (description) experience.description = description;
    if (endYear) experience.endYear = endYear;

    experiences.push(experience);
  }

  return experiences;
};

module.exports = {
  getExperience,
};
