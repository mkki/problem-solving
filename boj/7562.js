let [tc, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

tc = +tc;
let inputIndex = 0;

const directions = [
  [-2, 1],
  [-2, -1],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [1, 2],
  [-1, 2],
];


let result = [];

while (tc-- > 0) {
  const n = +inputs[inputIndex++];
  const [startY, startX] = inputs[inputIndex++].split(' ').map(Number);
  const [distY, distX] = inputs[inputIndex++].split(' ').map(Number);

  const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;
  const distance = Array.from({ length: n }, () => Array(n).fill(Infinity));

  const queue = [];
  let head = 0;

  distance[startY][startX] = 0;
  queue.push([startY, startX]);

  while (queue.length - head > 0) {
    const [y, x] = queue[head++];

    if (y === distY && x === distX) {
      result.push(distance[y][x]);
    }

    for (const direction of directions) {
      const [dy, dx] = direction;
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (distance[nextY][nextX] !== Infinity) continue;

      distance[nextY][nextX] = distance[y][x] + 1;
      queue.push([nextY, nextX]);
    }
  }
}

console.log(result.join('\n'));
