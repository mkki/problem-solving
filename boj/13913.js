const [n, k] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const MAX = 200_000;
const visitedMap = Array(MAX + 1).fill(false);
const stepMap = Array(MAX + 1).fill(Infinity);

const directions = [(x) => x - 1, (x) => x + 1, (x) => x * 2];

const isValid = (x) => x >= 0 && x < MAX + 1;

let totalCount = 0;
const steps = [];

const queue = [];
let head = 0;

queue.push([n, 0, [n]]);
visitedMap[n] = true;

while (queue.length - head > 0) {
  const [x, count] = queue[head++];

  if (x === k) {
    totalCount = count;
    break;
  }

  for (const direction of directions) {
    const nextX = direction(x);

    if (!isValid(nextX)) continue;
    if (visitedMap[nextX]) continue;

    visitedMap[nextX] = true;
    stepMap[nextX] = x;
    queue.push([nextX, count + 1]);
  }
}

let current = k;
while (current !== Infinity) {
  steps.push(current);
  current = stepMap[current];
}

console.log(`${totalCount}\n${steps.reverse().join(' ')}`);
