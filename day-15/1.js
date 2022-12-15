const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let sensor = {'x': '', 'y': ''}, beacon = {'x': '', 'y': ''}
let map = {}

const getDistance = (x1, y1, x2, y2) => (Math.abs(x1 - x2) + Math.abs(y1 - y2))

input.split('\n').map((row, y) => {
  sensor['x'] = parseInt(row.split(' ')[2].split('=')[1].slice(0, -1), 10)
  sensor['y'] = parseInt(row.split(' ')[3].split('=')[1].slice(0, -1), 10)
  beacon['x'] = parseInt(row.split(' ')[8].split('=')[1].slice(0, -1), 10)
  beacon['y'] = parseInt(row.split(' ')[9].split('=')[1], 10)

  let distance = Math.abs(sensor['x'] - beacon['x']) + Math.abs(sensor['y'] - beacon['y'])

  for (let i = sensor['x'] - distance; i <= sensor['x'] + distance; i++)
    if (getDistance(sensor['x'], sensor['y'], i, 2000000) <= distance)
      map[i+',2000000'] = '#'
})

console.log(Object.keys(map).length)
