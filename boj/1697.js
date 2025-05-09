const [n, k] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const MAX = 200_001;
let result = 0;

const step = Array(MAX).fill(-1);
const directions = [(x) => x + 1, (x) => x - 1, (x) => 2 * x];

const isValid = (x) => x >= 0 && x < MAX;

const queue = [];
let head = 0;

queue.push(n);
step[n] = 0;

while (queue.length - head > 0) {
  const x = queue[head++];

  if (x === k) {
    result = step[x];
    break;
  }

  for (const direction of directions) {
    const nextX = direction(x);

    if (!isValid(nextX)) continue;
    if (step[nextX] !== -1) continue;
    step[nextX] = step[x] + 1;
    queue.push(nextX);
  }
}

console.log(result);
