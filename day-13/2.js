const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')
const lines = input.split('\n')
let topLeft, topRight

const compare = (left, right) => {
  while(true) {
    if (left.length == 0 && right.length > 0) return true
    if (left.length > 0 && right.length == 0) return false
    if (left.length == 0 && right.length == 0) return 'equal'
    topLeft = left.shift()
    topRight = right.shift()
    if (!Array.isArray(topLeft) && !Array.isArray(topRight)) {
      if (topLeft < topRight) return true
      if (topLeft > topRight) return false
    } else if (!Array.isArray(topLeft)) {
      const res = compare([topLeft], topRight)
      if (res !== 'equal') return res
    } else if (!Array.isArray(topRight)) {
      const res = compare(topLeft, [topRight])
      if (res !== 'equal') return res
    } else if (topRight.length || topLeft.length) {
      const res = compare(topLeft, topRight)
      if (res !== 'equal') return res
    }
  }
}

let sum2 = 1
let sum6 = 1
for (let i = 0; i < lines.length; i++) {
  if (lines[i] !== '') {
    if (compare(JSON.parse(lines[i]), [[2]])) sum2++
    if (compare(JSON.parse(lines[i]), [[6]])) sum6++
  }
}

console.log(sum2 * (sum6 + 1))
