const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m] = f.split(' ').map(Number);
const map = inputs.map((v) => v.split('').map(Number));
const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

const queue = [];
visitedMap[0][0] = true;
queue.push([0, 0]);

while (queue.length > 0) {
  const [y, x] = queue[0];
  queue.shift();

  for (const direction of directions) {
    const [dy, dx] = direction;
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (visitedMap[nextY][nextX]) continue;
    if (map[nextY][nextX] > 0) {
      visitedMap[nextY][nextX] = true;
      map[nextY][nextX] = map[y][x] + 1;
      queue.push([nextY, nextX]);
    }
  }
}

console.log(map[n - 1][m - 1]);
