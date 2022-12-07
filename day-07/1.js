const { fileContent } = require('../helpers/getFileContent')

const get = (obj, path, def) => {
	// Cache the current object
	var current = obj;
	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {
		// If the item isn't found, return the default (or null)
		if (!current.contents[path[i]]) return def;
		// Otherwise, update the current  value
		current = current.contents[path[i]];
	}
	return current;
};

// const input = fileContent(__dirname, './sample.txt')
const input = fileContent(__dirname, './input.txt')

let score = 0
let sizes = {}
let fs = {
  '/': {
    size: 0,
    path: [],
    contents: {},
    files: []
  }
}
let wd = fs['/']

input.split('\n').map(row => {
  if (row.trim()[0] === '$') {
    if (row.split(' ')[1] === 'cd') {
      if (row.split(' ')[2] === '/') {
        wd = fs['/']
      } else if (row.split(' ')[2] === '..') {
        wd = get(fs['/'], wd.path.slice(0, -1))
      } else {
        wd = wd.contents[row.split(' ')[2]]
      }
    }
  } else {
    if (row.split(' ')[0] === 'dir') {
      currentPath = [...wd.path]
      currentDir = row.split(' ')[1]
      currentPath.push(currentDir)
      wd.contents[row.split(' ')[1]] = {
        size: 0,
        path: currentPath,
        contents: {},
        files: []
      }
    } else {
      if (!wd.files.includes(row.split(' ')[1])) {
        wd.files.push(row.split(' ')[1])
        wd.size += parseInt(row.split(' ')[0], 10)
        sizes[wd.path || '/'] = wd.size
        parentWd = wd
        while (parentWd.path.length > 0) {
          parentWd = get(fs['/'], parentWd.path.slice(0, -1))
          parentWd.size += parseInt(row.split(' ')[0], 10)
          sizes[parentWd.path || '/'] = parentWd.size
        }
      }
    }
  }
})

for (const [key, value] of Object.entries(sizes)) {
  if (value <= 100000) score += value
}

console.log(score)