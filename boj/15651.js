const [n, m] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const result = [];
const numbers = [];

const recursive = (count) => {
  if (count === m) {
    result.push(numbers.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    numbers.push(i);
    recursive(count + 1);
    numbers.pop(i);
  }
};

recursive(0);

console.log(result.join('\n'));
