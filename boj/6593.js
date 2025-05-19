const [...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .filter((v) => v !== '');

const answers = [];
let inputIndex = 0;

while (true) {
  const line = inputs[inputIndex++].trim();

  if (line === '0 0 0') break;

  const [h, n, m] = line.split(' ').map(Number);

  const map = Array.from({ length: h }, (_, i) =>
    inputs
      .slice(inputIndex + i * n, inputIndex + (i + 1) * n)
      .map((v) => v.split(''))
  );

  inputIndex += h * n;

  const visitedMap = Array.from({ length: h }, () =>
    Array.from({ length: n }, () => Array(m).fill(Infinity))
  );
  let result = 'Trapped!';

  const isValid = (z, y, x) =>
    z >= 0 && z < h && y >= 0 && y < n && x >= 0 && x < m;

  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  const queue = [];
  let head = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < m; k++) {
        if (map[i][j][k] === 'S') {
          queue.push([i, j, k]);
          visitedMap[i][j][k] = 0;
        }
      }
    }
  }

  while (queue.length - head > 0) {
    const [z, y, x] = queue[head++];

    if (map[z][y][x] === 'E') {
      result = `Escaped in ${visitedMap[z][y][x]} minute(s).`;
      break;
    }

    for (const [dz, dy, dx]  of directions) {
      const nextZ = dz + z;
      const nextY = dy + y;
      const nextX = dx + x;

      if (!isValid(nextZ, nextY, nextX)) continue;
      if (visitedMap[nextZ][nextY][nextX] !== Infinity) continue;
      if (map[nextZ][nextY][nextX] === '#') continue;

      queue.push([nextZ, nextY, nextX]);
      visitedMap[nextZ][nextY][nextX] = visitedMap[z][y][x] + 1;
    }
  }

  answers.push(result);
}

console.log(answers.join('\n'));
