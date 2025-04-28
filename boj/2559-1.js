/**
 * 단순 구현(O(NK))
 */
const inputs = require('fs').readFileSync(0, 'utf8').trim().split('\n');
const [n, k] = inputs[0].split(' ').map(Number);
const temporatures = inputs[1].split(' ').map(Number);

let maxValue = -Infinity;

for (let i = 0; i < n - k + 1; i++) {
  let subSum = 0;
  for (let j = i; j < i + k; j++) {
    subSum += temporatures[j];
  }
  maxValue = Math.max(maxValue, subSum);
}

console.log(maxValue);
