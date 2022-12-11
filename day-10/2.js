const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let cycle = 0
let X = 0
let reg = 1
let sum = 0
let screen = []
let Y = 1

const check = () => {
  if (!screen[Y]) screen[Y] = ''
  if (X === reg || X === (reg - 1) || X === (reg + 1)) {
    screen[Y] += '*'
  } else {
    screen[Y] += ' '
  }
  X++
  if (cycle === 40 || cycle === 80 || cycle === 120 || cycle === 160 || cycle === 200 || cycle === 240) {
    Y++
    X = 0
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

console.log(screen)