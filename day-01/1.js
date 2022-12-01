const { clipboardCopy } = require('../helpers/clipboardCopy')
const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './01-input.txt')

let mostFood = 0
let currentFood = 0

input.split('\n').map((item, i, arr) => {
  const isLast = i + 1 === arr.length
  if (item === '' || isLast) {
    if (isLast) currentFood += parseInt(item, 10)
    if (currentFood > mostFood) mostFood = currentFood
    currentFood = 0
  } else {
    currentFood += parseInt(item, 10)
  }
})

clipboardCopy(mostFood.toString())
