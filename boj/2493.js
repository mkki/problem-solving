const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let [n, tasks] = input;

const arr = tasks.split(' ').map(Number);
const stack = [
  {
    height: Number.MAX_VALUE,
    index: 0,
  },
];
const result = [];

for (let i = 0; i < n; i++) {
  while (stack.length !== 0 && stack[stack.length - 1].height < arr[i]) {
    stack.pop();
  }

  result.push(stack[stack.length - 1].index);

  stack.push({
    height: arr[i],
    index: i + 1,
  });
}

console.log(result.join(' '));
