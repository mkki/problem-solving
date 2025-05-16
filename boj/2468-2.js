let [n, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

n = +n;
const map = inputs.map((v) => v.trim().split(' ').map(Number));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

let max = 0;

for (let k = 0; k <= 100; k++) {
  const visitedMap = Array.from({ length: n }, () => Array.from(n).fill(false));
  let count = 0;

  const queue = [];
  let head = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visitedMap[i][j]) continue;
      if (map[i][j] <= k) continue;

      count++;
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
          if (map[nextY][nextX] <= k) continue;

          visitedMap[nextY][nextX] = true;
          queue.push([nextY, nextX]);
        }
      }
    }
  }

  max = Math.max(max, count);
}

console.log(max);
