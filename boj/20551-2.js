/**
 * binary search(lower bound)
 */
const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m] = f.split(' ').map(Number);
const a = inputs.slice(0, n).map(Number).sort((a, b) => a - b)
const b = inputs.slice(n, n + m).map(Number);

const result = [];

for (const target of b) {
  let start = 0;
  let end = a.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (a[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  if (a[start] === target) {
    result.push(start);
  } else {
    result.push(-1);
  }
}

console.log(result.join('\n'));
