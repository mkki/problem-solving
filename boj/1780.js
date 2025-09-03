const [first, ...input] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const n = Number(first);
const map = input.map((v) => v.split(' ').map(Number));

const result = [0, 0, 0];

const recursive = (x, y, size) => {
  const firstValue = map[x][y];
  let flag = true;

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[i][j] !== firstValue) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      break;
    }
  }

  if (flag) {
    result[firstValue + 1]++;
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      recursive(x + (i * size) / 3, y + (j * size) / 3, size / 3);
    }
  }
};

recursive(0, 0, n);

console.log(result.join('\n'));
