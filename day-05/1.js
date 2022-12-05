const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = ''
let stacks = []

input.split('\n').map(row => {
  if (row.trim()[0] === '[') {
    row.match(/.{1,4}/g).map((item, index) => {
      if (item.charAt(1) !== ' ') {
        if (!stacks[index]) stacks[index] = new Array(0)
        stacks[index].unshift(item.charAt(1))
      }
    })
  }

  if (row.trim()[0] === 'm') {
    const toBeMoved = row.split(' ')[1]
    const origin = row.split(' ')[3] - 1
    const destination = row.split(' ')[5] - 1

    for (let i=0; i < toBeMoved; i++) {
      stacks[destination].push(stacks[origin].pop())
    }
  }
})

stacks.map(stack => {
  score += stack.pop()
})

console.log(score)