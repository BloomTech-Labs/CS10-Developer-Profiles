const faker = require('faker');
const { getRandomInt } = require('./getRandomInt');
const { getTechStack } = require('../datasets/skills');

const getProjectImage = (blank) => {
  const rand = Math.random();
  const img = 'http://placeimg.com/1000/480/tech';

  return blank && (rand >= 0 && rand < blank / 100) ? null : img;
};

const getProjectLink = (blank) => {
  const rand = Math.random();
  const link = faker.internet.url();

  return blank && (rand >= 0 && rand < blank / 100) ? null : link;
};

const getProjectRepo = (firstName, lastName, blank) => {
  const rand = Math.random();
  const repo = `https://github.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}/${faker.lorem.word()}`;

  return blank && (rand >= 0 && rand < blank / 100) ? null : repo;
};

const getProjects = (maxProjects, firstName, lastName, blank) => {
  const rand = Math.random();
  const numProjects = blank && (rand >= 0 && rand < blank / 100) ? 0 : getRandomInt(1, maxProjects);
  const projects = [];

  for (let i = 0; i < numProjects; i += 1) {
    const img = getProjectImage(20);
    const link = getProjectLink(60);
    const repo = getProjectRepo(firstName, lastName, 10);
    const project = {
      title: faker.lorem.words(getRandomInt(3, 5)),
      description: faker.lorem.sentences(getRandomInt(1, 10)),
      tech: getTechStack(3, 5, 10),
    };

    if (img) project.img = img;
    if (link) project.link = link;
    if (repo) project.repo = repo;

    projects.push(project);
  }

  return projects;
};

module.exports = {
  getProjects,
};
