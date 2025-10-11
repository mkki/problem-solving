const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const n = +f;
const eggs = inputs.map((v) => v.split(' ').map(Number));

let max = 0;

const recursive = (current) => {
  if (current === n) {
    const count = eggs.filter(([duration, _]) => duration <= 0).length;

    max = Math.max(max, count);
    return;
  }

  if (eggs[current][0] <= 0) {
    recursive(current + 1);
    return;
  }

  let hasEggs = false;

  for (let i = 0; i < n; i++) {
    if (i === current || eggs[i][0] <= 0) {
      continue;
    }

    hasEggs = true;

    eggs[current][0] -= eggs[i][1];
    eggs[i][0] -= eggs[current][1];
    recursive(current + 1);
    eggs[current][0] += eggs[i][1];
    eggs[i][0] += eggs[current][1];
  }

  if (!hasEggs) {
    recursive(current + 1);
  }
};

recursive(0);
console.log(max);
