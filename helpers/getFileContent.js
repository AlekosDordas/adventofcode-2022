const path = require('path');
const fs = require('fs')

const fileContent = (dir, file) =>
  fs.readFileSync(path.resolve(dir, file)).toString()

  module.exports = {
    fileContent
  }