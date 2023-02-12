const input = require('fs').readFileSync(0, 'utf-8').trim();

const array = input.split('');
const stack = [];
let result = 0;

for (let i = 0; i < array.length; i++) {
  if (array[i] === '(') {
    stack.push(array[i]);
  } else {
    stack.pop();
    if (array[i - 1] === '(') {
      result += stack.length;
    } else {
      result++;
    }
  }
}

console.log(result);
