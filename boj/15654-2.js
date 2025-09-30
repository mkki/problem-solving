const [f, input] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [n, m] = f.split(' ').map(Number);
const numbers = input
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const currentArray = [];
const result = [];
const isUsed = [];

const recursive = (count) => {
  if (count === m) {
    result.push(currentArray.join(' '));
    return;
  }

  for (let i = 0; i < n; i++) {
    const currentNumber = numbers[i];
    if (isUsed[currentNumber]) continue;

    currentArray[count] = currentNumber;
    isUsed[currentNumber] = true;
    recursive(count + 1);
    isUsed[currentNumber] = false;
  }
};

recursive(0);

console.log(result.join('\n'));
