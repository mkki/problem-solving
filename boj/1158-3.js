/**
 * 구현
 */
const input = require('fs').readFileSync(0, 'utf-8').split(' ').map(Number);

const [n, k] = input;

const list = [...Array(n).keys()].map((v) => v + 1);
const result = [];
let index = 0;

while (list.length > 0) {
  index = (index + (k - 1)) % list.length;
  result.push(list.splice(index, 1));
}

console.log(`<${result.join(', ')}>`);
