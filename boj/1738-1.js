/**
 * DFS 사용 불가
 */
const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const visitedMap = Array.from({ length: n }, () => Array(m).fill(false));
const directions = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
];

const visitedDirections = Array(4).fill(false);

let result = 1;

const isValid = (y, x) => {
  return y >= 0 && y < n && x >= 0 && x < m;
};

const dfs = (y, x, visitedMap, visitedDirections, count = 1) => {
  result = Math.max(result, count);

  for (let i = 0; i < 4; i++) {
    const [dy, dx] = directions[i];
    const nextY = y + dy;
    const nextX = x + dx;

    if (isValid(nextY, nextX) && !visitedMap[nextY][nextX]) {
      const newVisitedMap = visitedMap.map((row) => [...row]);
      const newVisitedDirections = [...visitedDirections];
      newVisitedMap[nextY][nextX] = true;
      newVisitedDirections[i] = true;

      if (count >= 4) {
        if (newVisitedDirections.every((v) => v)) {
          dfs(nextY, nextX, newVisitedMap, newVisitedDirections, count + 1);
        }
      } else {
        dfs(nextY, nextX, newVisitedMap, newVisitedDirections, count + 1);
      }
    }
  }
};

visitedMap[n - 1][0] = true;
dfs(n - 1, 0, visitedMap, visitedDirections);

console.log(result);
