const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let sensor = {'x': '', 'y': ''}, beacon = {'x': '', 'y': ''}
let sensors = []

const getDistance = (x1, y1, x2, y2) => (Math.abs(x1 - x2) + Math.abs(y1 - y2))

input.split('\n').map((row, y) => {
  sensor['x'] = parseInt(row.split(' ')[2].split('=')[1].slice(0, -1), 10)
  sensor['y'] = parseInt(row.split(' ')[3].split('=')[1].slice(0, -1), 10)
  beacon['x'] = parseInt(row.split(' ')[8].split('=')[1].slice(0, -1), 10)
  beacon['y'] = parseInt(row.split(' ')[9].split('=')[1], 10)

  let distance = Math.abs(sensor['x'] - beacon['x']) + Math.abs(sensor['y'] - beacon['y'])

  sensors.push({'x': sensor['x'], 'y': sensor['y'], 'distance': distance})
})

for (let i=0; i <= 4000000; i++) {
  for (let j=0; j <= 4000000; j++) {
    let found = false
    for (let k=0; k < sensors.length; k++) {
      if (getDistance(sensors[k]['x'], sensors[k]['y'], i, j) <= sensors[k].distance) {
        found = true
        j = sensors[k]['y'] + (sensors[k].distance - Math.abs(sensors[k]['x'] -  i))
        break
      }
    }
    if (!found) console.log('FOUND', i, j)
  }
}