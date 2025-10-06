const inputs = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const output = [];
let inputIndex = 0;

const recursive = (result, numbers, currentNumbers, index, count) => {
  if (count === 6) {
    result.push(currentNumbers.join(' '));
    return;
  }

  for (let i = index; i < numbers.length; i++) {
    const number = numbers[i];

    currentNumbers[count] = number;
    recursive(result, numbers, currentNumbers, i + 1, count + 1);
  }
};

while (true) {
  const [k, ...numbers] = inputs[inputIndex++].trim().split(' ').map(Number);
  if (k === 0) {
    break;
  }

  numbers.sort((a, b) => a - b);

  const result = [];
  const currentNumbers = [];
  recursive(result, numbers, currentNumbers, 0, 0);
  output.push(result.join('\n'));
}

console.log(output.join('\n\n'));
