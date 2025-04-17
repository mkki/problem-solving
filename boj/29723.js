const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let sum = 0;

const [N, M, K] = f.split(' ').map(Number);

const map = new Map();

inputs.slice(0, N).forEach((item) => {
  const [k, v] = item.split(' ');
  map.set(k, +v);
});

const collageArray = inputs.slice(N, N + K);

for (const item of collageArray) {
  sum += map.get(item);
  map.delete(item);
}

let min = (max = sum);

const mapToArray = [...map].map(([_, v]) => v).sort((a, b) => a - b);

for (let i = 0; i < M - K; i++) {
  min += mapToArray[i];
  max += mapToArray[mapToArray.length - 1 - i];
}

console.log(`${min} ${max}`);
