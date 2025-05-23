const [n, k] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const MAX = 100_000;
const visitedMap = Array(2 * MAX + 1).fill(false);

const isValid = (x) => x >= 0 && x <= 2 * MAX;
const directions = [(x) => x * 2, (x) => x - 1, (x) => x + 1];

let time = 0;

const deque = Array(4 * MAX);
let head = 2 * MAX;
let tail = 2 * MAX;

visitedMap[n] = true;
deque[tail++] = [n, 0];

while (tail - head > 0) {
  const [x, step] = deque[head++];

  if (x === k) {
    time = step;
    break;
  }

  for (let i = 0; i < 3; i++) {
    const nextX = directions[i](x);

    if (!isValid(nextX)) continue;
    if (visitedMap[nextX]) continue;

    visitedMap[nextX] = true;

    if (i === 0) {
      deque[--head] = [nextX, step];
    } else {
      deque[tail++] = [nextX, step + 1];
    }
  }
}

console.log(time);
