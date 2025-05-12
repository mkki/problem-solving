let [n, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

n = Number(n);

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

const map = inputs.map((v) => v.trim().split(''));
const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));

const abnormalMap = inputs.map((v) => v.trim().split(''));
const visitedAbnormalMap = Array.from({ length: n }, () => Array(n).fill(false));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (abnormalMap[i][j] === 'G') {
      abnormalMap[i][j] = 'R';
    }
  }
}

let count = 0;
const queue = [];
let head = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visitedMap[i][j]) continue;
    visitedMap[i][j] = true;
    queue.push([i, j]);
    count++;

    while (queue.length - head > 0) {
      const [y, x] = queue[head++];

      for (const direction of directions) {
        const [dy, dx] = direction;
        const nextY = y + dy;
        const nextX = x + dx;

        if (!isValid(nextY, nextX)) continue;
        if (visitedMap[nextY][nextX]) continue;
        if (map[nextY][nextX] === map[y][x]) {
          visitedMap[nextY][nextX] = true;
          queue.push([nextY, nextX]);
        }
      }
    }
  }
}

let abnormalCount = 0;
const abnormalQueue = [];
head = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visitedAbnormalMap[i][j]) continue;
    visitedAbnormalMap[i][j] = true;
    abnormalQueue.push([i, j]);
    abnormalCount++;

    while (abnormalQueue.length - head > 0) {
      const [y, x] = abnormalQueue[head++];

      for (const direction of directions) {
        const [dy, dx] = direction;
        const nextY = y + dy;
        const nextX = x + dx;

        if (!isValid(nextY, nextX)) continue;
        if (visitedAbnormalMap[nextY][nextX]) continue;
        if (abnormalMap[nextY][nextX] === abnormalMap[y][x]) {
          visitedAbnormalMap[nextY][nextX] = true;
          abnormalQueue.push([nextY, nextX]);
        }
      }
    }
  }
}

console.log(`${count} ${abnormalCount}`);
