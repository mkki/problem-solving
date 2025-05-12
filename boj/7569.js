const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [m, n, h] = f.split(' ').map(Number);
const map = Array.from({ length: h }, (_, i) =>
  inputs.slice(i * n, i * n + n).map((v) => v.split(' ').map(Number))
);

const distance = Array.from({ length: h }, () =>
  Array.from({ length: n }, () => Array(m).fill(Infinity))
);

const directions = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

const isValid = (z, y, x) =>
  z >= 0 && z < h && y >= 0 && y < n && x >= 0 && x < m;

let result = 0;
const queue = [];
let head = 0;

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (map[i][j][k] === 1) {
        distance[i][j][k] = 0;
        queue.push([i, j, k]);
      }
    }
  }
}

while (queue.length - head > 0) {
  const [z, y, x] = queue[head++];

  for (const direction of directions) {
    const [dz, dy, dx] = direction;
    const nextZ = z + dz;
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextZ, nextY, nextX)) continue;
    if (map[nextZ][nextY][nextX] === -1) continue;
    if (distance[nextZ][nextY][nextX] !== Infinity) continue;
    distance[nextZ][nextY][nextX] = distance[z][y][x] + 1;
    map[nextZ][nextY][nextX] = 1;
    queue.push([nextZ, nextY, nextX]);
    result = Math.max(result, distance[nextZ][nextY][nextX]);
  }
}

if (map.flatMap((v) => v.flatMap((v) => v)).filter((v) => v === 0).length > 0) {
  result = -1;
}

console.log(result);
