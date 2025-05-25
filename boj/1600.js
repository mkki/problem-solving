const [f, s, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const k = +f;
const [m, n] = s.split(' ').map(Number);
const map = inputs.map((v) => v.split(' ').map(Number));
const visitedMap = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array(k + 1).fill(false))
);

const hourseDirections = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let result = -1;

const queue = [[0, 0, 0, 0]];
let head = 0;

visitedMap[0][0][0] = true;

while (queue.length - head > 0) {
  const [y, x, count, hourseCount] = queue[head++];

  if (y === n - 1 && x === m - 1) {
    result = count;
    break;
  }

  for (const [dy, dx] of directions) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (visitedMap[nextY][nextX][hourseCount]) continue;
    if (map[nextY][nextX] === 1) continue;

    visitedMap[nextY][nextX][hourseCount] = true;
    queue.push([nextY, nextX, count + 1, hourseCount]);
  }

  if (hourseCount < k) {
    for (const [dy, dx] of hourseDirections) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (visitedMap[nextY][nextX][hourseCount + 1]) continue;
      if (map[nextY][nextX] === 1) continue;

      visitedMap[nextY][nextX][hourseCount + 1] = true;
      queue.push([nextY, nextX, count + 1, hourseCount + 1]);
    }
  }
}

console.log(result);
