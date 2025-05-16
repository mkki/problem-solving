/**
 * DFS
 */
const [n, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let result = 0;
const grid = inputs.map((v) => v.split(' ').map(Number));
const position = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let height = 1; height <= 100; height++) {
  const visited = [...Array(+n)].map(() => Array(+n).fill(false));
  let numberOfArea = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] >= height && !visited[i][j]) {
        dfs(i, j, height, visited);
        numberOfArea += 1;
      }
    }
  }

  result = Math.max(result, numberOfArea);
}

function isValidPosition(i, j) {
  return i >= 0 && i < n && j >= 0 && j < n;
}

function dfs(i, j, height, visited) {
  visited[i][j] = true;

  for (let k = 0; k < 4; k++) {
    const [dy, dx] = position[k];
    const y = i + dy;
    const x = j + dx;
    if (isValidPosition(y, x) && !visited[y][x] && grid[y][x] >= height) {
      dfs(y, x, height, visited);
    }
  }
}

console.log(result);
