const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = 0

input.split('\n').map(row => {
  const p1 = row.split(',')[0]
  const p2 = row.split(',')[1]

  const p1s = parseInt(p1.split('-')[0], 10)
  const p1e = parseInt(p1.split('-')[1], 10)

  const p2s = parseInt(p2.split('-')[0], 10)
  const p2e = parseInt(p2.split('-')[1], 10)

  if (p1s >= p2s && p1e <= p2e) {
    score += 1
  } else if (p2s >= p1s && p2e <= p1e) {
    score += 1
  }
})

clipboardCopy(score.toString())