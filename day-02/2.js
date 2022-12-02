const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './01-input.txt')

let score = 0

const shapeResults = {
  X: {
    points: { A: 3 , B: 1, C: 2 },
    outcome: 0
  },
  Y: {
    points: { A: 1 , B: 2, C: 3 },
    outcome: 3
  },
  Z: {
    points: { A: 2 , B: 3, C: 1 },
    outcome: 6
  }
}

input.split('\n').map(round => {
  const opponent = round.split(' ')[0]
  const me = round.split(' ')[1]
  score += shapeResults[me].points[opponent] + shapeResults[me].outcome
})

clipboardCopy(score.toString())
