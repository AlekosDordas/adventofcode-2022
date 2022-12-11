const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let visited = {}
let snake = new Array(10).fill().map(() => ({
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
        for (let k = 0; k < 9; k++)
          moveNext(snake[k], snake[k+1], k == 8)
      }
      break
    case 'D':
      for (let i = 0; i < steps; i++) {
        snake[0]['y']--
        for (let k = 0; k < 9; k++)
          moveNext(snake[k], snake[k+1], k == 8)
      }
      break
    case 'R':
      for (let i = 0; i < steps; i++) {
        snake[0]['x']++
        for (let k = 0; k < 9; k++)
          moveNext(snake[k], snake[k+1], k == 8)
      }
      break
    case 'L':
      for (let i = 0; i < steps; i++) {
        snake[0]['x']--
        for (let k = 0; k < 9; k++) 
          moveNext(snake[k], snake[k+1], k == 8)
      }
      break
  }
})

console.log(Object.keys(visited).length)