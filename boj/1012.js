let [tc, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let inputIndex = 0;

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x, n, m) => y >= 0 && y < n && x >= 0 && x < m;

while (tc-- > 0) {
  const [m, n, k] = inputs[inputIndex++].trim().split(' ').map(Number);
  const map = Array.from({ length: n }, () => Array(m).fill(0));
  const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
  let count = 0;

  for (let i = 0; i < k; i++) {
    const [x, y] = inputs[inputIndex++].trim().split(' ').map(Number);
    map[y][x] = 1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visitedMap[i][j]) continue;
      if (map[i][j] === 0) continue;

      const queue = [];
      let head = 0;
      queue.push([i, j]);
      visitedMap[i][j] = true;
      count++;

      while (queue.length - head > 0) {
        const [y, x] = queue[head++];

        for (const direction of directions) {
          const [dy, dx] = direction;
          const nextY = y + dy;
          const nextX = x + dx;

          if (!isValid(nextY, nextX, n, m)) continue;
          if (visitedMap[nextY][nextX]) continue;
          if (map[nextY][nextX] === 0) continue;
          visitedMap[nextY][nextX] = true;
          queue.push([nextY, nextX]);
        }
      }
    }
  }

  console.log(count);
}
