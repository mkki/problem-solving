const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...tasks] = input;
const stack = [];

for (const task of tasks.map(Number)) {
  if (task === 0) {
    stack.pop();
  } else {
    stack.push(task);
  }
}

console.log(stack.reduce((a, b) => a + b, 0));
