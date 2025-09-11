const [f, ...input] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const n = Number(f);
const map = input.map((v) => v.split('').map(Number));

const result = [];

const recursive = (n, x, y) => {
  const firstValue = map[x][y];
  let isSame = true;

  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (map[i][j] !== firstValue) {
        isSame = false;
        break;
      }
    }

    if (!isSame) {
      break;
    }
  }

  if (isSame) {
    result.push(firstValue);
    return;
  }

  result.push('(');

  const half = n / 2;
  recursive(half, x, y);
  recursive(half, x, y + half);
  recursive(half, x + half, y);
  recursive(half, x + half, y + half);

  result.push(')');
};

recursive(n, 0, 0);

console.log(result.join(''));
