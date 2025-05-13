let [tc, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
tc = +tc;
let inputIndex = 0;

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const result = [];

while (tc-- > 0) {
  const [m, n] = inputs[inputIndex++].split(' ').map(Number);
  const map = inputs.slice(inputIndex, inputIndex + n).map((v) => v.split(''));
  const fireMap = Array.from({ length: n }, () => Array(m).fill(Infinity));
  const userMap = Array.from({ length: n }, () => Array(m).fill(Infinity));
  inputIndex += n;

  const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

  const fireQueue = [];
  const userQueue = [];
  let head = 0;

  let count = 'IMPOSSIBLE';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === '*') {
        fireMap[i][j] = 0;
        fireQueue.push([i, j]);
      } else if (map[i][j] === '@') {
        userMap[i][j] = 0;
        userQueue.push([i, j]);
      }
    }
  }

  while (fireQueue.length - head > 0) {
    const [y, x] = fireQueue[head++];

    for (const direction of directions) {
      const [dy, dx] = direction;
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (fireMap[nextY][nextX] !== Infinity) continue;
      if (map[nextY][nextX] === '#') continue;

      fireMap[nextY][nextX] = fireMap[y][x] + 1;
      fireQueue.push([nextY, nextX]);
    }
  }

  head = 0;

  while (userQueue.length - head > 0) {
    const [y, x] = userQueue[head++];

    if (y === 0 || y === n - 1 || x === 0 || x === m - 1) {
      count = userMap[y][x] + 1;
      break;
    }

    for (const direction of directions) {
      const [dy, dx] = direction;
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (userMap[nextY][nextX] !== Infinity) continue;
      if (map[nextY][nextX] === '#') continue;
      if (fireMap[nextY][nextX] <= userMap[y][x] + 1) continue;

      userMap[nextY][nextX] = userMap[y][x] + 1;
      userQueue.push([nextY, nextX]);
    }
  }

  result.push(count);
}

console.log(result.join('\n'));
