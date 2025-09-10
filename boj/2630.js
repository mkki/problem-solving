const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const n = Number(f);
const map = inputs.map((v) => v.split(' ').map(Number));

let totalWhite = 0;
let totalBlue = 0;

const recursive = (n, i, j) => {
  const current = map[i][j];
  let flag = true;

  for (let k = i; k < i + n; k++) {
    for (let l = j; l < j + n; l++) {
      if (current !== map[k][l]) {
        flag = false;
        break;
      }
    }

    if (!flag) {
      break;
    }
  }

  if (flag) {
    if (current === 1) {
      totalBlue++;
    } else {
      totalWhite++;
    }

    return;
  }

  const half = n / 2;

  recursive(half, i, j);
  recursive(half, i, j + half);
  recursive(half, i + half, j);
  recursive(half, i + half, j + half);
};

recursive(n, 0, 0);

console.log(`${totalWhite}\n${totalBlue}`);
