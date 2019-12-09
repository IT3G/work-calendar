const dotenv = require('dotenv');
const fs = require('fs');

let config;

function getConfig() {
  const configPath = `../environments/${process.env.NODE_ENV || 'dev'}.env`;
  if (!config) {
    config = dotenv.parse(fs.readFileSync(configPath));
  }
  return config;
}

module.exports = getConfig();
