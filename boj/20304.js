const inputs = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const n = +inputs.shift();
const m = +inputs.shift();
const attempts = inputs.shift().split(' ').map(Number);

const distanceMap = Array(n + 1).fill(-1);
const visitedMap = Array(n + 1).fill(false);

const isValid = (x) => x >= 0 && x <= n;

const MAX_BIT = Math.floor(Math.log2(n)) + 1;

const queue = [];
let head = 0;

for (const attempt of attempts) {
  queue.push(attempt);
  distanceMap[attempt] = 0;
  visitedMap[attempt] = true;
}

while (queue.length - head > 0) {
  const current = queue[head++];

  for (let bit = 0; bit < MAX_BIT; bit++) {
    const next = current ^ (1 << bit);

    if (!isValid(next)) continue;
    if (visitedMap[next]) continue;

    visitedMap[next] = true;
    distanceMap[next] = distanceMap[current] + 1;
    queue.push(next);
  }
}

console.log(Math.max(...distanceMap));
