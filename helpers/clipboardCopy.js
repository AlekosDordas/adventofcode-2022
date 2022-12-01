const clipboardCopy = data => {
    var proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data); proc.stdin.end();
}

module.exports = {
  clipboardCopy
}