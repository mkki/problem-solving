const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m, g, r] = f.split(' ').map(Number);
const map = inputs.map((v) => v.split(' ').map(Number));

const getCombinations = (arr, m) => {
  const combinations = [];
  const current = [];

  const recursive = (count, index) => {
    if (current.length === m) {
      combinations.push(current.slice());
      return;
    }

    for (let i = index; i < arr.length; i++) {
      current.push(arr[i]);
      recursive(count + 1, i + 1);
      current.pop();
    }
  };

  recursive(0, 0);

  return combinations;
};

const dirs = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

const possibleMap = [];
let max = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      possibleMap.push([i, j]);
    }
  }
}

const combinations = getCombinations(possibleMap, g + r);

for (const combination of combinations) {
  const greens = getCombinations(combination, g);
  for (const green of greens) {
    const red = combination.filter(
      ([y1, x1]) => !green.some(([y2, x2]) => y1 === y2 && x1 === x2)
    );
    let count = 0;

    const queue = [];
    let head = 0;

    const state = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => [0, -1])
    );

    for (const [y, x] of green) {
      state[y][x] = [1, 0];
      queue.push([y, x]);
    }

    for (const [y, x] of red) {
      state[y][x] = [2, 0];
      queue.push([y, x]);
    }

    while (queue.length - head > 0) {
      const [y, x] = queue[head++];
      const [color, time] = state[y][x];

      if (color === 3) continue;

      for (const dir of dirs) {
        const [dy, dx] = dir;
        const ny = dy + y;
        const nx = dx + x;

        if (!isValid(ny, nx)) continue;
        if (map[ny][nx] === 0) continue;
        if (state[ny][nx][0] === 0) {
          state[ny][nx] = [color, time + 1];
          queue.push([ny, nx]);
        } else if (state[ny][nx][0] === 1) {
          if (color === 2 && state[ny][nx][1] === time + 1) {
            state[ny][nx][0] = 3;
            count++;
          }
        } else if (state[ny][nx][0] === 2) {
          if (color === 1 && state[ny][nx][1] === time + 1) {
            state[ny][nx][0] = 3;
            count++;
          }
        }
      }
    }

    max = Math.max(count, max);
  }
}

console.log(max);
