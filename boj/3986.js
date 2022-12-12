const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...array] = input;
let result = 0;

for (const word of array) {
  const stack = [];

  for (const char of word.split('')) {
    if (stack.length === 0) {
      stack.push(char);
    } else {
      const top = stack[stack.length - 1];

      if (char !== top) {
        stack.push(char);
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length === 0) {
    result += 1;
  }
}

console.log(result);
