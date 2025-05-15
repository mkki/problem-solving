const [f, s, g, u, d] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const map = Array(f).fill(Infinity);

const directions = [(x) => x + u, (x) => x - d];
const isValid = (v) => v >= 0 && v < f;

let result = 'use the stairs';

const queue = [];
let head = 0;

map[s - 1] = 0;
queue.push(s - 1);

while (queue.length - head > 0) {
  const x = queue[head++];

  if (x === g - 1) {
    result = map[x];
    break;
  }

  for (const direction of directions) {
    const nextX = direction(x);

    if (!isValid(nextX)) continue;
    if (map[nextX] !== Infinity) continue;

    map[nextX] = map[x] + 1;
    queue.push(nextX);
  }
}

console.log(result);
