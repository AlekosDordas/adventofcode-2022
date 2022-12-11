const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let visited = {}
let snake = new Array(2).fill().map(() => ({
  'x': 0,
  'y': 0
}))
visited['0,0'] = '*'

const moveNext = (current, next, isTail) => {
  if ((next['x'] == (current['x'] + 2)) && (next['y'] == (current['y'] + 2))) {
    next['x']--
    next['y']--
  } else if ((next['x'] == (current['x'] + 2)) && (next['y'] == (current['y'] - 2))) {
    next['x']--
    next['y']++
  } else if ((next['x'] == (current['x'] - 2)) && (next['y'] == (current['y'] - 2))) {
    next['x']++
    next['y']++
  } else if ((next['x'] == (current['x'] - 2)) && (next['y'] == (current['y'] + 2))) {
    next['x']++
    next['y']--
  } else if (next['y'] == (current['y'] + 2)) {
    next['x'] = current['x']
    next['y']--
  } else if (next['x'] == (current['x'] + 2)) {
    next['x']--
    next['y'] = current['y']
  } else if (next['y'] == (current['y'] - 2)) {
    next['x'] = current['x']
    next['y']++
  } else if (next['x'] == (current['x'] - 2)) {
    next['x']++
    next['y'] = current['y']
  }
  if (isTail) visited[`${next['x'].toString()},${next['y'].toString()}`] = '*'
} 

input.split('\n').map((row, y) => {
  const [direction, steps] = row.split(' ')
  switch (direction) {
    case 'U':
      for (let i = 0; i < steps; i++) {
        snake[0]['y']++
        moveNext(snake[0], snake[1], true)
      }
      break
    case 'D':
      for (let i = 0; i < steps; i++) {
        snake[0]['y']--
        moveNext(snake[0], snake[1], true)
      }
      break
    case 'R':
      for (let i = 0; i < steps; i++) {
        snake[0]['x']++
        moveNext(snake[0], snake[1], true)
      }
      break
    case 'L':
      for (let i = 0; i < steps; i++) {
        snake[0]['x']--
        moveNext(snake[0], snake[1], true)
      }
      break
  }
})

console.log(Object.keys(visited).length)