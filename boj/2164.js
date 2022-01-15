const input = require('fs').readFileSync(0, 'utf-8').trim();

const n = Number(input);

const q = [...Array(n).keys()].map((v) => v + 1);
let head = 0;

while (q.length - head > 1) {
  q[head++];
  q.push(q[head++]);
}

console.log(q[head]);
