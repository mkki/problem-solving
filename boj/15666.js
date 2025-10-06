const [n, m, ...numbers] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .flatMap((v) => v.split(' ').map(Number));

const result = [];
const currentNumbers = [];

numbers.sort((a, b) => a - b);

const recursive = (index, count) => {
  if (m === count) {
    result.push(currentNumbers.join(' '));
    return;
  }

  let previous;

  for (let i = index; i < n; i++) {
    const number = numbers[i];

    if (number === previous) continue;

    previous = number;
    currentNumbers[count] = number;
    recursive(i, count + 1);
  }
};

recursive(0, 0);
console.log(result.join('\n'));
