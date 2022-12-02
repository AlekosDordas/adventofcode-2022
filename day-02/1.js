const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './01-input.txt')

let score = 0

const shapeResults = {
  X: {
    points: 1,
    outcome: { A: 3 , B: 0, C: 6 }
  },
  Y: {
    points: 2,
    outcome: { A: 6 , B: 3, C: 0 }
  },
  Z: {
    points: 3,
    outcome: { A: 0 , B: 6, C: 3 }
  }
}

input.split('\n').map(round => {
  const opponent = round.split(' ')[0]
  const me = round.split(' ')[1]
  score += shapeResults[me].points + shapeResults[me].outcome[opponent]
})

clipboardCopy(score.toString())
