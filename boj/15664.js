const [n, m, ...numbers] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .flatMap((v) => v.split(' ').map(Number));

numbers.sort((a, b) => a - b);

const result = [];
const currentNumbers = [];
const isUsed = [];

const recursive = (index, count) => {
  if (count === m) {
    result.push(currentNumbers.join(' '));
    return;
  }

  let previous;

  for (let i = index; i < n; i++) {
    const number = numbers[i];
    if (isUsed[i] || number === previous) continue;
    previous = number;
    isUsed[i] = true;
    currentNumbers.push(number);
    recursive(i + 1, count + 1);
    isUsed[i] = false;
    currentNumbers.pop(number);
  }
};

recursive(0, 0);

console.log(result.join('\n'));
