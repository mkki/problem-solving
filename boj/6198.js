const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...buildings] = input;

const stack = [];
let result = 0;

for (const building of buildings.map(Number)) {
  while (stack.length !== 0 && stack[stack.length - 1] <= building) {
    stack.pop();
  }

  result += stack.length;

  stack.push(building);
}

console.log(result);
