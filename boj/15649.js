const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const current = [];
const result = [];
const isUsed = Array(n + 1).fill(false);

const recursive = (count) => {
  if (m === count) {
    result.push(current.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (!isUsed[i]) {
      current[count] = i;
      isUsed[i] = true;
      recursive(count + 1);
      isUsed[i] = false;
    }
  }
};

recursive(0);

console.log(result.join('\n'));
