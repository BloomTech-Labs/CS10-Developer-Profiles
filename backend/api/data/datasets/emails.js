const { getRandomInt } = require('../utils/getRandomInt');

const emailProviders = ['gmail', 'yahoo', 'outlook'];

const getEmail = (firstName, lastName, blank) => {
  const rand = Math.random();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
    emailProviders[getRandomInt(0, emailProviders.length - 1)]
  }.com`;

  return blank && (rand >= 0 && rand < blank / 100) ? '' : email;
};

module.exports = {
  getEmail,
};
