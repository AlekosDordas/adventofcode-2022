const { fileContent } = require('../helpers/getFileContent')

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let jetIndex = -1
const getJet = () => {
  jetIndex++
  return input[jetIndex % input.length] == '>' ? 1 : -1
}

let shapeIndex = -1
const getNewShape = (x, y) => {
  shapeIndex++
  return new Shape[shapeIndex % Shape.length](x, y)
}

let floor = [0, 0, 0, 0, 0, 0, 0]

class genericShape {
  move(x, y) {
    for (let i in this.area) {
      this.area[i][0] += x
      this.area[i][1] += y
    }
  }

  collideDown() {
    for (let i in this.area) {
      if (map[`${this.area[i][0]},${this.area[i][1] - 1}`] == '#') return true
      if (this.area[i][1] <= 1) return true
    }
    return false
  }

  collideLeft() {
    for (let i in this.area) {
      if (map[`${this.area[i][0] - 1},${this.area[i][1]}`] == '#') return true
      if (this.area[i][0] <= 0) return true
    }
    return false
  }

  collideRight() {
    for (let i in this.area) {
      if (map[`${this.area[i][0] + 1},${this.area[i][1]}`] == '#') return true
      if (this.area[i][0] >= 6) return true
    }
    return false
  }
}

let Shape = [
  class extends genericShape {
    constructor(x, y) { super(); this.move(x, y); }
    name = "Horizontal Line"
    area = [[0,0], [1,0], [2,0], [3,0]]
  },
  class extends genericShape {
    constructor(x, y) { super(); this.move(x, y); }
    name = "Cross"
    area = [[0,1], [1,2], [1,1], [1,0], [2,1]]
  },
  class extends genericShape {
    constructor(x, y) { super(); this.move(x, y); }
    name = "Inverted L"
    area = [[0,0], [1,0], [2, 0], [2,1], [2,2]]
  },
  class extends genericShape {
    constructor(x, y) { super(); this.move(x, y); }
    name = "Vertical Line"
    area = [[0,0], [0,1], [0,2], [0,3]]
  },
  class extends genericShape {
    constructor(x, y) { super(); this.move(x, y); }
    name = "Cube"
    area = [[0,0], [1,0], [0,1], [1,1]]
  }
]

const getHighestPoint = () => Math.max.apply(Math, floor);

let currentShape, shapes = 0, map = {}



while (shapes < 1000000000000) {
  currentShape = getNewShape(2, getHighestPoint() + 4)

  getJet() == 1
      ? !currentShape.collideRight() && currentShape.move(1, 0)
      : !currentShape.collideLeft() && currentShape.move(-1, 0)

  while(!currentShape.collideDown()) {
    currentShape.move(0, -1)
    getJet() == 1
      ? !currentShape.collideRight() && currentShape.move(1, 0)
      : !currentShape.collideLeft() && currentShape.move(-1, 0)
  }

  for (let i in currentShape.area) {
    floor[currentShape.area[i][0]] = Math.max(floor[currentShape.area[i][0]], currentShape.area[i][1])
    map[`${currentShape.area[i][0]},${currentShape.area[i][1]}`] = '#'
  }


  shapes++

  if (shapes > 561 && (shapes - 561) % 1725 == 0) {
    shapeIndex = 999999998960
    shapes = 999999998961
    floor[0] = 1561739128792
    floor[1] = 1561739128792
    floor[2] = 1561739128792
    floor[3] = 1561739128792
    floor[4] = 1561739128792
    floor[5] = 1561739128792
    floor[6] = 1561739128792
    map = {
      '0,1561739128792': '#',
      '1,1561739128792': '#',
      '3,1561739128792': '#',
      '4,1561739128792': '#',
      '5,1561739128792': '#',
      '6,1561739128792': '#'
    }
  }
}
console.log(getHighestPoint())

