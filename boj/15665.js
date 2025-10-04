const [n, m, ...numbers] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .flatMap((v) => v.split(' ').map(Number));

numbers.sort((a, b) => a - b);

const currentNumbers = [];
const result = [];

const recursive = (count) => {
  if (count === m) {
    result.push(currentNumbers.join(' '));
    return;
  }

  let previous;

  for (let i = 0; i < n; i++) {
    const number = numbers[i];
    if (number === previous) continue;
    previous = number;
    currentNumbers[count] = number;
    recursive(count + 1);
  }
};

recursive(0);

console.log(result.join('\n'));
