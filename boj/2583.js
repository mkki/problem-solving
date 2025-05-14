const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m, _] = f.split(' ').map(Number);
const map = Array.from({ length: n }, () => Array(m).fill(0));
const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
const positions = inputs.map((v) => v.trim().split(' ').map(Number));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let total = 0;
const spaces = [];

for (const position of positions) {
  const [x1, y1, x2, y2] = position;

  for (let i = y1; i < y2; i++) {
    for (let j = x1; j < x2; j++) {
      map[i][j] = 1;
    }
  }
}

const queue = [];
let head = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visitedMap[i][j]) continue;
    if (map[i][j] === 1) continue;

    let count = 1;
    visitedMap[i][j] = true;
    queue.push([i, j]);

    while (queue.length - head > 0) {
      const [y, x] = queue[head++];

      for (const direction of directions) {
        const [dy, dx] = direction;
        const nextY = y + dy;
        const nextX = x + dx;

        if (!isValid(nextY, nextX)) continue;
        if (visitedMap[nextY][nextX]) continue;
        if (map[nextY][nextX] === 1) continue;

        count++;
        visitedMap[nextY][nextX] = true;
        queue.push([nextY, nextX]);
      }
    }

    total++;
    spaces.push(count);
  }
}

console.log(`${total}\n${spaces.sort((a, b) => a - b).join(' ')}`);
