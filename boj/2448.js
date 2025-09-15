const n = +require('fs').readFileSync(0, 'utf-8').trim();

const map = Array.from({ length: n }, () => Array(2 * n - 1).fill(' '));

const recursive = (n, x, y) => {
  if (n === 3) {
    map[x][y] = '*';
    map[x + 1][y - 1] = '*';
    map[x + 1][y + 1] = '*';
    for (let i = -2; i <= 2; i++) {
      map[x + 2][y + i] = '*';
    }
    return;
  }

  const half = n / 2;

  recursive(half, x, y);
  recursive(half, x + half, y - half);
  recursive(half, x + half, y + half);
};

recursive(n, 0, n - 1);

console.log(map.map((row) => row.join('')).join('\n'));
