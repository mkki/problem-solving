const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

let result;

if (n === 1) {
  result = 1;
} else if (n === 2) {
  result = Math.min(4, Math.floor((m - 1) / 2) + 1);
} else {
  if (m < 7) {
    result = Math.min(4, m);
  } else {
    result = m - 2;
  }
}

console.log(result);
