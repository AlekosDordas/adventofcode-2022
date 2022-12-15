const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let i, j, min, max, depth = 0, edge1 = 99999999, edge2 = 0
const rocks = {}

input.split('\n').map((row, index) => {
  const path = row.split(' -> ')
  for (i = 0; i < path.length - 1; i++) {
    const x1 = parseInt(path[i].split(',')[0], 10)
    const y1 = parseInt(path[i].split(',')[1], 10)
    const x2 = parseInt(path[i+1].split(',')[0], 10)
    const y2 = parseInt(path[i+1].split(',')[1], 10)
    if (x1 === x2) {
      min = Math.min(y1, y2)
      max = Math.max(y1, y2)
      if (max > depth) depth = max
      for (j = min; j <= max; j++) {
        rocks[x1+','+j] = '#'
      }
    } else {
      min = Math.min(x1, x2)
      max = Math.max(x1, x2)
      if (max > edge2) edge2 = max
      if (min < edge1) edge1 = min
      for (j = min; j <= max; j++) {
        rocks[j+','+y1] = '#'
      }
    }
  }
})

for (let k = 0; k <= 1000; k++) rocks[k+','+(depth + 2)] = '#'

const next = (x, y) => {
  if (!rocks[x+','+(y+1)]) return [x, y+1]
  if (!rocks[(x-1)+','+(y+1)]) return [x-1, y+1]
  if (!rocks[(x+1)+','+(y+1)]) return [x+1, y+1]
  return [x,y]
}

let drops = 0

const drop = () => {
  let x = 500, y = 0, nextX, nextY, nextCoords

  while(true) {
    x = 500
    y = 0
    nextCoords = next(x,y)
    nextX = nextCoords[0]
    nextY = nextCoords[1]
    while(nextX !== x || nextY !== y) {
      x = nextX
      y = nextY
      nextCoords = next(x,y)
      nextX = nextCoords[0]
      nextY = nextCoords[1]
    }

    rocks[nextX+','+nextY] = '#'
    drops++
    if (nextX == 500 && nextY == 0) return
  }
}

drop()
console.log(drops)
