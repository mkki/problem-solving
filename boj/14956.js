const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const recursive = (n, m) => {
  if (n === 2) {
    if (m === 1) {
      return [1, 1];
    } else if (m === 2) {
      return [1, 2];
    } else if (m === 3) {
      return [2, 2];
    } else if (m === 4) {
      return [2, 1];
    }
  }

  const subSquare = (n * n) / 4;
  const half = n / 2;

  if (m <= subSquare) {
    const [nx, ny] = recursive(half, m);
    return [ny, nx];
  } else if (m <= 2 * subSquare) {
    const [nx, ny] = recursive(half, m - subSquare);
    return [nx, ny + half];
  } else if (m <= 3 * subSquare) {
    const [nx, ny] = recursive(half, m - 2 * subSquare);
    return [nx + half, ny + half];
  } else {
    const [nx, ny] = recursive(half, m - 3 * subSquare);
    return [2 * half - ny + 1, half - nx + 1];
  }
};

const [x, y] = recursive(n, m);

console.log(`${x} ${y}`);
