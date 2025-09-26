const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const result = [];
const numbers = [];
const isUsed = Array(n + 1).fill(false);

const recursive = (index, count) => {
  if (count === m) {
    result.push(numbers.join(' '));
    return;
  }

  for (let i = index; i <= n; i++) {
    if (isUsed[i]) continue;

    numbers.push(i);
    isUsed[i] = true;
    recursive(i, count + 1);
    numbers.pop();
    isUsed[i] = false;
  }
};

recursive(1, 0);

console.log(result.join('\n'));
