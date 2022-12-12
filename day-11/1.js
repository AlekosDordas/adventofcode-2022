const { fileContent } = require('../helpers/getFileContent')

const input = fileContent(__dirname, './sample.txt')
// const input = fileContent(__dirname, './input.txt')

let currentMonkey
game = []
times = new Array(10).fill(0)

input.split('\n').map((row, index) => {
  if (row.trim().split(' ')[0] == 'Monkey') {
    currentMonkey = parseInt(row.trim().split(' ')[1].slice(0, -1), 10);
  } else if (row.trim().split(' ')[0] == 'Starting') {
    if (!game[currentMonkey]) game[currentMonkey] = {}
    game[currentMonkey].items = row.trim().split(' ').slice(2).map(i => parseInt(i, 10))
  } else if (row.trim().split(' ')[0] == 'Operation:') {
    game[currentMonkey].operation = x => {
      if (row.trim().split(' ').at(-2) == '*') {
        if (row.trim().split(' ').at(-1) == 'old') {
          return x * x
        } else {
          return x * parseInt(row.trim().split(' ').at(-1), 10)
        }
      } else {
        if (row.trim().split(' ').at(-1) == 'old') {
          return x + x
        } else {
          return x + parseInt(row.trim().split(' ').at(-1), 10)
        }
      }
    }
  } else if (row.trim().split(' ')[0] == 'Test:') {
    game[currentMonkey].test = parseInt(row.trim().split(' ').at(-1), 10)
  } else if (row.trim().split(' ')[0] == 'If') {
    if (row.trim().split(' ')[1] == 'true:') {
      game[currentMonkey].true = parseInt(row.trim().split(' ').at(-1), 10)
    } else {
      game[currentMonkey].false = parseInt(row.trim().split(' ').at(-1), 10)
    }
  }
})

for (let round = 0; round < 20; round++) {
  for (let i = 0; i < game.length; i++) {
    for (let item = 0; item < game[i].items.length; item++) {
      times[i]++
      game[i].items[item] = game[i].operation(game[i].items[item])
      game[i].items[item] = Math.floor(game[i].items[item] / 3)
      if ((game[i].items[item] % game[i].test) == 0) {
        game[game[i].true].items.push(game[i].items[item])
      } else {
        game[game[i].false].items.push(game[i].items[item])
      }
    }
    game[i].items = []
  }
}

console.log(times)
console.log(times.sort((a, b) => b - a)[0] * times.sort((a, b) => b - a)[1])