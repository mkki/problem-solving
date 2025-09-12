const n = +require('fs').readFileSync(0, 'utf-8').trim();

const map = Array.from({ length: n }, () => Array(n).fill(''));

const recursive = (n, x, y) => {
  if (n === 1) {
    map[x][y] = '*';
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue;
      recursive(n / 3, x + (i * n) / 3, y + (j * n) / 3);
    }
  }
};

recursive(n, 0, 0);

console.log(
  map
    .map((line) => line.map((v) => (v === '' ? ' ' : v)))
    .map((v) => v.join(''))
    .join('\n')
);
