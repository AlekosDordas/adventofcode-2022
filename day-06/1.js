const { fileContent } = require('../helpers/getFileContent')

const input = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
const arr = Array.from(input)

let score = ''

for (let i = 0; i<= arr.length; i++) {
  if ((arr[i] !== arr[i+1])
    && (arr[i] !== arr[i+2])
    && (arr[i] !== arr[i+3])
    && (arr[i+1] !== arr[i+2])
    && (arr[i+1] !== arr[i+3])
    && (arr[i+2] !== arr[i+3])
  ) {
    console.log(i + 4)
    return
  }
}
