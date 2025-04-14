const [_, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let result = 0;

const xArray = {};
const yArray = {};

for (const input of inputs) {
  const [x, y] = input.split(' ').map(Number);

  if (xArray[x] === undefined) {
    xArray[x] = 1;
  } else {
    xArray[x]++;
  }

  if (yArray[y] === undefined) {
    yArray[y] = 1;
  } else {
    yArray[y]++;
  }
}

result += Object.values(xArray).filter(v => v > 1).length;
result += Object.values(yArray).filter(v => v > 1).length;

console.log(result);
