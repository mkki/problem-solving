const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [m, n] = f.split(' ').map(Number);
const map = inputs.map((v) => v.split(' ').map(Number));
const visitedMap = Array.from({ length: n }, () => Array(m).fill(0));
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;
const queue = [];
let head = 0;
let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 1) {
      visitedMap[i][j] = 1;
      queue.push([i, j]);
    } else if (map[i][j] === -1) {
      visitedMap[i][j] = -1;
    }
  }
}

while (queue.length - head > 0) {
  const [y, x] = queue[head++];
  count = Math.max(count, visitedMap[y][x] - 1);

  for (const direction of directions) {
    const [dy, dx] = direction;
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (visitedMap[nextY][nextX] === 0 && map[nextY][nextX] > -1) {
      visitedMap[nextY][nextX] = visitedMap[y][x] + 1;
      queue.push([nextY, nextX]);
    }
  }
}

if (visitedMap.flatMap((v) => v).filter((v) => v === 0).length > 0) {
  count = -1;
}

console.log(count);
