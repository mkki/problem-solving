const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');
const [n, m] = f.split(' ').map(Number);

const map = inputs.map((v) => v.split('').map(Number));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let result = -1;

const visitedMap = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array(2).fill(false))
);

const queue = [];
let head = 0;

visitedMap[0][0] = 1;
queue.push([0, 0, 0, 1]);

while (queue.length - head > 0) {
  const [y, x, isBreak, distance] = queue[head++];

  if (y === n - 1 && x === m - 1) {
    result = Math.max(result, distance);
    break;
  }

  for (const [dy, dx] of directions) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (map[nextY][nextX] === 0 && !visitedMap[nextY][nextX][isBreak]) {
      visitedMap[nextY][nextX][isBreak] = true;
      queue.push([nextY, nextX, isBreak, distance + 1]);
    }

    if (
      map[nextY][nextX] === 1 &&
      isBreak === 0 &&
      !visitedMap[nextY][nextX][1]
    ) {
      visitedMap[nextY][nextX][1] = true;
      queue.push([nextY, nextX, 1, distance + 1]);
    }
  }
}

console.log(result);
