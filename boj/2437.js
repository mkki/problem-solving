let [_, inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
inputs = inputs.split(' ').map(Number).sort((a, b) => a - b);

let sum = 0;

for (let i = 0; i < inputs.length; i++) {
  if (sum + 1 < inputs[i]) break;
  sum += inputs[i]
}

console.log(sum + 1);