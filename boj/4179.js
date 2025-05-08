const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');
const [n, m] = f.split(' ').map(Number);
const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let result = 'IMPOSSIBLE';

const originalMap = inputs.map((v) => v.split(''));
const fireMap = Array.from({ length: n }, () => Array(m).fill(Infinity));
const map = Array.from({ length: n }, () => Array(m).fill(-1));

const fireQueue = [];
const queue = [];
let head = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (originalMap[i][j] === 'F') {
      fireMap[i][j] = 0;
      fireQueue.push([i, j]);
    } else if (originalMap[i][j] === 'J') {
      map[i][j] = 0;
      queue.push([i, j]);
    }
  }
}

while (fireQueue.length - head > 0) {
  const [y, x] = fireQueue[head++];

  for (const direction of directions) {
    const [dy, dx] = direction;
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (originalMap[nextY][nextX] === '#' || fireMap[nextY][nextX] !== Infinity) continue;
    fireMap[nextY][nextX] = fireMap[y][x] + 1;
    fireQueue.push([nextY, nextX]);
  }
}

head = 0;

while (queue.length - head > 0) {
  const [y, x] = queue[head++];

  if (y === 0 || y === n - 1 || x === 0 || x === m - 1) {
    result = map[y][x] + 1;
    break;
  }

  for (const direction of directions) {
    const [dy, dx] = direction;
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (originalMap[nextY][nextX] === '#' || map[nextY][nextX] !== -1) continue;
    if (map[y][x] + 1 >= fireMap[nextY][nextX]) continue;
    map[nextY][nextX] = map[y][x] + 1;
    queue.push([nextY, nextX]);
  }
}

console.log(result);
