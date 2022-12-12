const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...array] = input;
const result = [];

for (const word of array) {
  const stack = [];
  let isParenthesis = true;

  for (const char of word.split('')) {
    if (stack.length > 0) {
      if (char === ')') {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else {
      if (char === '(') {
        stack.push(char);
      } else {
        isParenthesis = false;
        break;
      }
    }
  }

  if (isParenthesis && stack.length === 0) {
    result.push('YES');
  } else {
    result.push('NO');
  }
}

console.log(result.join('\n'));
