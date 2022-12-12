const inputs = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
inputs.pop();

const result = [];

for (const input of inputs) {
  const array = input.split('').filter(el => el === '(' || el === ')' || el === '[' || el === ']');
  const stack = [];
  let isBalanced = true;

  for (const char of array) {
    if (char === '(' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length > 0) {
        const top = stack[stack.length - 1];

        if ((char === ')' && top === '(') || (char === ']' && top === '[')) {
          stack.pop();
        } else {
          isBalanced = false;
          break;
        }
      } else {
        isBalanced = false;
        break;
      }
    }
  }

  if (isBalanced && stack.length === 0) {
    result.push('yes');
  } else {
    result.push('no');
  }
}

console.log(result.join('\n'));
