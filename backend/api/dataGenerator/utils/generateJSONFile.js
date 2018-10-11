const fs = require('fs');

const generateJSONFile = (path, data) => {
  const jsonData = JSON.stringify(data);

  fs.writeFile(path, jsonData, (err) => {
    if (err) console.log(err); // eslint-disable-line no-console
  });
};

module.exports = {
  generateJSONFile,
};
