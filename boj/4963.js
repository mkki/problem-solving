const inputs = require('fs').readFileSync(0, 'utf8').trim().split('\n');
const result = [];
const positions = [
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 1],
  [-1, -1],
];

while (true) {
  const [w, h] = inputs.shift().split(' ').map(Number);
  if (w === 0 && h === 0) break;

  const map = Array.from({ length: h }, () =>
    inputs.shift().split(' ').map(Number)
  );
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  let count = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const cell = map[i][j];

      if (!visited[i][j] && cell === 1) {
        dfs(i, j, map, visited, h, w);

        count++;
      }
    }
  }

  result.push(count);
}

function isValidPosition(i, j, h, w) {
  return i >= 0 && i < h && j >= 0 && j < w;
}

function dfs(i, j, map, visited, h, w) {
  visited[i][j] = true;

  for (const position of positions) {
    const [dy, dx] = position;
    const y = i + dy;
    const x = j + dx;

    if (isValidPosition(y, x, h, w) &&!visited[y][x] && map[y][x] === 1) {
      dfs(y, x, map, visited, h, w);
    }
  }
}

console.log(result.join('\n'));
