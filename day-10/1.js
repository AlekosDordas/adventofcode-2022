const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let cycle = 0
let reg = 1
let sum = 0

const check = () => {
  if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) {
    sum += reg * cycle
  }
}

input.split('\n').map(row => {
  if (row.split(' ')[0] === 'noop') {
    cycle++
    check()
  } else {
    cycle++
    check()
    cycle++
    check()
    reg += parseInt((row.split(' ')[1]), 10)
  }
})

console.log(sum)