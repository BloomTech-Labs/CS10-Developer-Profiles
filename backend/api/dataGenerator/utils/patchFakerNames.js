const { arrayElement } = require('faker').random;
const { femaleNames } = require('../datasets/femaleFirstNames.js');
const { maleNames } = require('../datasets/maleFirstNames.js');

const fakerFirstName = gender => arrayElement(gender === 0 ? maleNames : femaleNames);

module.exports = {
  fakerFirstName,
};
