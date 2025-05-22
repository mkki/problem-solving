const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const n = +f;
const map = inputs.map((v) => v.split(' ').map(Number));
const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

let result = Infinity;

let islandIndex = 2;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visitedMap[i][j]) continue;
    if (map[i][j] !== 1) continue;

    const queue = [];
    let head = 0;

    visitedMap[i][j] = true;
    queue.push([i, j]);

    while (queue.length - head > 0) {
      const [y, x] = queue[head++];
      map[y][x] = islandIndex;

      for (const [dy, dx] of directions) {
        const nextY = y + dy;
        const nextX = x + dx;

        if (!isValid(nextY, nextX)) continue;
        if (visitedMap[nextY][nextX]) continue;
        if (map[nextY][nextX] === 1) {
          visitedMap[nextY][nextX] = true;
          queue.push([nextY, nextX]);
        }
      }
    }

    islandIndex++;
  }
}

for (let island = 2; island < islandIndex; island++) {
  const distance = Array.from({ length: n }, () => Array(n).fill(Infinity));

  const queue = [];
  let head = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === island) {
        distance[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  while (queue.length - head > 0) {
    const [y, x] = queue[head++];

    if (map[y][x] !== 0 && map[y][x] !== island) {
      result = Math.min(result, distance[y][x] - 1);
      break;
    }

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (distance[nextY][nextX] !== Infinity) continue;
      if (map[nextY][nextX] === 0 || map[nextY][nextX] !== island) {
        distance[nextY][nextX] = distance[y][x] + 1;
        queue.push([nextY, nextX]);
      }
    }
  }
}

console.log(result);
