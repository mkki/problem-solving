const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m] = f.split(' ').map(Number);
let map = inputs.map((v) => v.split(' ').map(Number));

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

let result = 0;

while (true) {
  const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
  const nextMap = Array.from({ length: n }, () => Array(m).fill(0));
  let groupCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 0) continue;
      if (visitedMap[i][j]) continue;

      groupCount++;

      const queue = [];
      let head = 0;

      visitedMap[i][j] = true;
      queue.push([i, j]);

      while (queue.length - head > 0) {
        const [y, x] = queue[head++];
        let waterCount = 0;

        for (const [dy, dx] of directions) {
          const nextY = y + dy;
          const nextX = x + dx;

          if (!isValid(nextY, nextX)) continue;
          if (map[nextY][nextX] === 0) {
            waterCount += 1;
          } else if (map[nextY][nextX] > 0 && !visitedMap[nextY][nextX]) {
            visitedMap[nextY][nextX] = true;
            queue.push([nextY, nextX]);
          }
        }

        nextMap[y][x] = Math.max(map[y][x] - waterCount, 0);
      }
    }
  }

  if (groupCount > 1) {
    break;
  } else if (groupCount === 0) {
    result = 0;
    break;
  }
  map = nextMap;
  result++;
}

console.log(result);
