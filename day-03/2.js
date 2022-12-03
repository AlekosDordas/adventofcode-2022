const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = 0
let commonChars = ''
let previousString = ''

input.split('\n').map((row, index) => {
  if (previousString === '') {
    previousString = row
    return
  }

  if (index % 3 === 1) {
    for (let i in row) {
      if (previousString.includes(row[i])) {
        if (!commonChars.includes(row[i])) commonChars += row[i]
      }
    }
  }

  if (index % 3 === 2) {
    for (let i in row) {
      if (commonChars.includes(row[i])) {
        if (row[i] == row[i].toUpperCase()){
          score += row[i].charCodeAt(0) - 38
        } else {
          score += row[i].charCodeAt(0) - 96
        }
        break
      }
    }

    commonChars = ''
    previousString = ''
  }
})

clipboardCopy(score.toString())
