const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './01-input.txt')

let mostFood = []
let currentFood = 0

input.split('\n').map((item, i, arr) => {
  const isLast = i + 1 === arr.length
  if (item === '' || isLast) {
    if (isLast) currentFood += parseInt(item, 10)
    const lessFooders = mostFood.filter(i => i < currentFood)
    if (mostFood.length < 3) {
      mostFood.push(currentFood)
    } else if (lessFooders.length) {
      mostFood = mostFood.sort((a, b) => a - b).slice(1).concat([currentFood])
    }
    currentFood = 0
  } else {
    currentFood += parseInt(item, 10)
  }
})

clipboardCopy(mostFood.reduce((a, b) => a + b, 0).toString())

