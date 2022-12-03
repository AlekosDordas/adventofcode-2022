const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = 0

input.split('\n').map(row => {
  let c1 = row.slice(0, row.length / 2)
  let c2 = row.slice(row.length / 2)

  for (let i in c1) {
    if (c2.includes(c1[i])) {
      if (c1[i] == c1[i].toUpperCase()){
        score += c1[i].charCodeAt(0) - 38
      } else {
        score += c1[i].charCodeAt(0) - 96
      }
      return true
    }
  }
})

clipboardCopy(score.toString())
