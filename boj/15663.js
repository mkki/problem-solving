const [n, m, ...numbers] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .flatMap((v) => v.split(' ').map(Number));

numbers.sort((a, b) => a - b);

const currentNumbers = [];
const result = [];
const isUsed = [];

const recursive = (count) => {
  if (count === m) {
    result.push(currentNumbers.join(' '));
    return;
  }

  let previous = -1;

  for (let i = 0; i < n; i++) {
    if (isUsed[i] || previous === numbers[i]) continue;
    const number = numbers[i];
    currentNumbers[count] = number;
    previous = number;

    isUsed[i] = true;
    recursive(count + 1);
    isUsed[i] = false;
  }
};

recursive(0);

console.log(result.join('\n'));
