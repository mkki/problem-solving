const [n, m, ...numbers] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .flatMap((v) => v.split(' ').map(Number));

const currentNumbers = [];
const result = [];

numbers.sort((a, b) => a - b);

const recursive = (index, count) => {
  if (count === m) {
    result.push(currentNumbers.join(' '));
    return;
  }

  for (let i = index; i < n; i++) {
    const number = numbers[i];

    currentNumbers[count] = number;
    recursive(i + 1, count + 1);
  }
};

recursive(0, 0);

console.log(result.join('\n'));
