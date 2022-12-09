const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = 0

let grid = []

input.split('\n').map((row, y) => {
  for (let x = 0; x < row.length; x++) {
    if (!grid[y]) grid[y] = []
    grid[y][x] = parseInt(row.charAt(x), 10)
  }
})

let hidden
let i
let checked = 0;

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    checked += 1
    hidden = 0
    // Check top
    for (i = 0; i < x ; i++) {
      if (grid[i][y] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check bottom
    for (i = x + 1; i < grid[0].length ; i++) {
      if (grid[i][y] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check left
    for (i = 0; i < y ; i++) {
      if (grid[x][i] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check right
    for (i = y+1; i < grid.length ; i++) {
      if (grid[x][i] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    if (hidden < 4) {
      score += 1
    } else {
    }
  }
}

console.log('Checked:', checked)
console.log('Found:', score)
console.log('Width:', grid[0].length)
console.log('Height:', grid.length)

