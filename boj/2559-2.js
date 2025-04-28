/**
 * Sliding Window(O(N))
 */
const inputs = require('fs').readFileSync(0, 'utf8').trim().split('\n');
const [n, k] = inputs[0].split(' ').map(Number);
const temporatures = inputs[1].split(' ').map(Number);

let maxValue = -Infinity;
let subSum = 0;

for (let i = 0; i < k; i++) {
  subSum += temporatures[i];
}

maxValue = Math.max(maxValue, subSum);

for (let i = k; i < n; i++) {
  subSum = subSum - temporatures[i - k] + temporatures[i];
  maxValue = Math.max(maxValue, subSum);
}

console.log(maxValue);
