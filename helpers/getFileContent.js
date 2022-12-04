const path = require('path');
const fs = require('fs')

const fileContent = (dir, file) =>
  fs.readFileSync(path.resolve(dir, file), { encoding: 'utf8', flag: 'r' }).toString()

  module.exports = {
    fileContent
  }