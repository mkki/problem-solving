const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, _] = f.split(' ').map(Number);
const lightMap = Array.from({ length: n }, () => Array(n).fill(false));
const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));
const switchMap = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => [])
);

const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

for (const input of inputs) {
  const [y, x, switchY, switchX] = input
    .split(' ')
    .map(Number)
    .map((v) => v - 1);
  switchMap[y][x].push([switchY, switchX]);
}

const queue = [];
let head = 0;

visitedMap[0][0] = true;
lightMap[0][0] = true;
queue.push([0, 0]);

while (queue.length - head > 0) {
  const [y, x] = queue[head++];

  for (const [switchY, switchX] of switchMap[y][x]) {
    if (!lightMap[switchY][switchX]) {
      lightMap[switchY][switchX] = true;

      for (const [dy, dx] of directions) {
        const adjY = switchY + dy;
        const adjX = switchX + dx;

        if (!isValid(adjY, adjX)) continue;
        if (visitedMap[switchY][switchX]) continue;
        if (visitedMap[adjY][adjX]) {
          visitedMap[switchY][switchX] = true;
          queue.push([switchY, switchX]);
          break;
        }
      }
    }
  }

  for (const [dy, dx] of directions) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (visitedMap[nextY][nextX]) continue;
    if (!lightMap[nextY][nextX]) continue;

    visitedMap[nextY][nextX] = true;
    queue.push([nextY, nextX]);
  }
}

console.log(lightMap.flatMap((row) => row.filter((v) => v)).length);
