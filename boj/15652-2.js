const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const result = [];
const numbers = [];

const recursive = (number, count) => {
  if (m === count) {
    result.push(numbers.join(' '));
    return;
  }

  for (let i = number; i <= n; i++) {
    numbers[count] = i;
    recursive(i, count + 1);
  }
};

recursive(1, 0);

console.log(result.join('\n'));
