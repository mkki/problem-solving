const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...arr] = input;

const stack = [];
let result = 0;

for (const currentHeight of arr.map(Number)) {
  let frequency = 1;

  while (stack.length && stack[stack.length - 1].height <= currentHeight) {
    result += stack[stack.length - 1].frequency;

    if (stack[stack.length - 1].height === currentHeight) {
      frequency += stack[stack.length - 1].frequency;
    }

    stack.pop();
  }

  if (stack.length > 0) {
    result++;
  }

  stack.push({
    frequency: frequency,
    height: currentHeight,
  });
}

console.log(result);
