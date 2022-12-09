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
    topp = 0
    for (i = x - 1; i >= 0 ; i--) {
      topp += 1
      if (grid[i][y] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check bottom
    bottom = 0
    for (i = x + 1; i < grid[0].length ; i++) {
      bottom += 1
      if (grid[i][y] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check left
    left = 0
    for (i = y - 1; i >= 0 ; i--) {
      left += 1
      if (grid[x][i] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }
    // Check right
    right = 0
    for (i = y+1; i < grid.length ; i++) {
      right += 1
      if (grid[x][i] >= grid[x][y]) {
        hidden = hidden + 1
        break
      }
    }

    if ((topp * bottom * left * right) > score) score = (topp * bottom * left * right)
  }
}

console.log('Found:', score)

