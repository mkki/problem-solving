const [n, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const map = inputs.map((v) => v.split('').map(Number));
const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));

const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

let total = 0;
const result = [];
const queue = [];
let head = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] !== 1) continue;
    if (visitedMap[i][j]) continue;

    let count = 1;
    total++;
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
        if (map[nextY][nextX] !== 1) continue;

        count++;
        visitedMap[nextY][nextX] = true;
        queue.push([nextY, nextX]);
      }
    }

    result.push(count);
  }
}

console.log(`${total}\n${result.sort((a, b) => a - b).join('\n')}`);
