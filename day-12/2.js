const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './input.txt')

const map = []

const start = []

const end = {
  'x': null,
  'y': null
}

const getEndDistance = (x, y) => {
  return Math.sqrt(Math.pow((end['x'] - x), 2) + Math.pow((end['y'] - y), 2))
}

const canGo = (from, to) => {
  if (from === 'S') {
    return true
  } else if (to === 'E') {
    if (from === 'y' || from === 'z') return true
  } else {
    return from.charCodeAt(0) + 1 >= to.charCodeAt(0)
  }
}

const getNext = (x, y) => {
  const next = []
  if (map[x-1] && map[x-1][y]) {
    if (canGo(map[x][y], map[x-1][y])) next.push([x-1, y])
  }
  if (map[x+1] && map[x+1][y]) {
    if (canGo(map[x][y], map[x+1][y])) next.push([x+1, y])
  }
  if (map[x][y-1]) {
    if (canGo(map[x][y], map[x][y-1])) next.push([x, y-1])
  }
  if (map[x][y+1]) {
    if (canGo(map[x][y], map[x][y+1])) next.push([x, y+1])
  }
  return next
}

input.split('\n').map((row, y) => {
  map[y] = []
  for (let x = 0; x < row.length; x++) {
    map[y][x] = row[x]
    if (row[x] === 'S' || row[x] === 'a') {
      start.push(y+','+x)
    } else if (row[x] === 'E') {
      end['x'] = y
      end['y'] = x
    }
  }
})

const allDistances = []
let distances = {}
let visitQueue = []
let currentItem

start.map(currentStart => {
  distances = {}
  distances[parseInt(currentStart.split(',')[0], 10)+','+parseInt(currentStart.split(',')[1], 10)] = 0
  visitQueue = []

  getNext(parseInt(currentStart.split(',')[0], 10), parseInt(currentStart.split(',')[1], 10)).map(next => {
    visitQueue.push({ coords: next, cost: 1})
  })

  while(visitQueue.length > 0) {
    currentItem = visitQueue.shift()
    if (!distances[currentItem.coords[0]+','+currentItem.coords[1]]) {
      distances[currentItem.coords[0]+','+currentItem.coords[1]] = currentItem.cost

      getNext(currentItem.coords[0], currentItem.coords[1]).map(next => {
        visitQueue.push({ coords: next, cost: currentItem.cost + 1})
      })
    }
  }

  allDistances.push(distances[end['x']+','+end['y']])
})

console.log(allDistances.sort())