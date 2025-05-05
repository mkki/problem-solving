const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m] = f.split(' ').map(Number);
const map = inputs.map((v) => v.split(' ').map(Number));
const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let total = 0;
let max = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0 || visitedMap[i][j]) {
      continue;
    }

    let size = 1;
    const queue = [];
    queue.push([i, j]);
    visitedMap[i][j] = true;

    while (queue.length > 0) {
      const [y, x] = queue[0];
      queue.shift();

      for (const direction of directions) {
        const [dy, dx] = direction;
        const nextY = y + dy;
        const nextX = x + dx;

        if (
          isValid(nextY, nextX) &&
          !visitedMap[nextY][nextX] &&
          map[nextY][nextX] === 1
        ) {
          visitedMap[nextY][nextX] = true;
          size++;
          queue.push([nextY, nextX]);
        }
      }
    }

    total++;
    max = Math.max(max, size);
  }
}

console.log(`${total}\n${max}`);
