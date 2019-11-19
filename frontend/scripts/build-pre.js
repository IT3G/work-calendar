const fs = require('fs');

const getRepoInfo = require('git-repo-info');

const info = {
  git: getRepoInfo(),
  build: {
    timestamp: new Date().toLocaleString()
  }
};

const src = JSON.stringify(info);

/** Создание гитинфо */
console.log('Updating application version');
fs.writeFileSync(`${__dirname}/../src/assets/git-info.json`, src, {
  encoding: 'utf8'
});