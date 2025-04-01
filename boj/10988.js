const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('');

let result = true;

for (let i = 1; i <= 9; i++) {
  if (input[i] !== input[input.length - i - 1]) {
    result = false;
    break;
  }
}

console.log(result ? '1' : '0');