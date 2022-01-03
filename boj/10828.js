const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...tasks] = input;
const stack = [];
const result = [];

for (const task of tasks) {
  const [command, value] = task.split(' ');

  if (command === 'push') {
    stack.push(value);
  } else if (command === 'pop') {
    result.push(stack.length === 0 ? -1 : stack.pop());
  } else if (command === 'size') {
    result.push(stack.length);
  } else if (command === 'empty') {
    result.push(stack.length === 0 ? 1 : 0);
  } else {
    result.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
  }
}

console.log(result.join('\n'));
