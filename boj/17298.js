const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, task] = input;

const arr = task.split(' ').map(Number).reverse();
const stack = [];
const result = [];

for (const current of arr) {
  while (stack.length > 0 && stack[stack.length - 1] <= current) {
    stack.pop();
  }

  if (stack.length > 0) {
    result.push(stack[stack.length - 1]);
  } else {
    result.push(-1);
  }

  stack.push(current);
}

console.log(result.reverse().join(' '));
