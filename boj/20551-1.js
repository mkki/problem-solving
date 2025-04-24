/**
 * dictionary
 */
const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m] = f.split(' ').map(Number);
const a = inputs.slice(0, n).sort((a, b) => a - b);
const b = inputs.slice(n, n + m);

const result = [];
const map = new Map();

a.forEach((v, i) => {
  if (!map.has(v)) {
    map.set(v, i);
  }
});

for (const num of b) {
  if (map.has(num)) {
    const index = map.get(num);
    result.push(index);
  } else {
    result.push(-1);
  }
}

console.log(result.join('\n'));
