const { getRandomInt } = require('../utils/getRandomInt');

const jobTitles = {
  FSW: [
    'Junior Front End Developer',
    'Front End Developer',
    'Senior Front End Developer',
    'Lead Front End Developer',
    'Junior Back End Developer',
    'Back End Developer',
    'Senior Back End Developer',
    'Lead Back End Developer',
    'Junior Full Stack Developer',
    'Full Stack Developer',
    'Senior Full Stack Developer',
    'Lead Full Stack Developer',
    'Junior Software Developer',
    'Software Developer',
    'Senior Software Developer',
    'Lead Software Developer',
    'Project Manager',
    'Junior DevOps Engineer',
    'DevOps Engineer',
    'Senior DevOps Engineer',
    'Lead DevOps Engineer',
  ],
  IOS: [
    'Junior iOS Developer',
    'iOS Developer',
    'Senior iOS Developer',
    'Lead iOS Developer',
    'Junior Mobile Developer',
    'Mobile Developer',
    'Senior Mobile Developer',
    'Lead Mobile Developer',
  ],
  AND: [
    'Junior Android Developer',
    'Android Developer',
    'Senior Android Developer',
    'Lead Android Developer',
    'Junior Mobile Developer',
    'Mobile Developer',
    'Senior Mobile Developer',
    'Lead Mobile Developer',
  ],
  DS: [
    'Junior Data Engineer',
    'Data Engineer',
    'Senior Data Engineer',
    'Lead Data Engineer',
    'Junior Data Scientist',
    'Data Scientist',
    'Senior Data Scientist',
    'Lead Data Scientist',
    'Junior Data Analyst',
    'Data Analyst',
    'Senior Data Analyst',
    'Lead Data Analyst',
  ],
  UX: [
    'Junior UI Designer',
    'UI Designer',
    'Senior UI Designer',
    'Lead UI Designer',
    'Junior UX Designer',
    'UX Designer',
    'Senior UX Designer',
    'Lead UX Designer',
    'Junior UI / UX Designer',
    'UI / UX Designer',
    'Senior UI / UX Designer',
    'Lead UI / UX Designer',
    'Product Designer',
  ],
};

const getJobTitle = (track, blank) => {
  const rand = Math.random();
  const titles = jobTitles[track];

  return blank && (rand >= 0 && rand < blank / 100)
    ? null
    : titles[getRandomInt(0, titles.length - 1)];
};

module.exports = {
  getJobTitle,
};
