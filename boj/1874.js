const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

let [n, ...tasks] = input;

const stack = [];
let result = '';
let value = 1;

for (const task of tasks) {
  // 스택에 push하는 순서는 오름차순을 보장
  while (value <= task) {
    stack.push(value);
    result += '+\n';
    value++;
  }

  if (stack[stack.length - 1] !== task) {
    result = 'NO';
    break;
  }

  stack.pop();
  result += '-\n';
}

console.log(result);
