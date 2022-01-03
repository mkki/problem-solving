/**
 * Circular Linked List
 */
const input = require('fs').readFileSync(0, 'utf-8').split(' ').map(Number);

const [n, k] = input;

const previous = [-1];
const next = [-1];
const result = [];

for (let i = 1; i <= n; i++) {
  previous[i] = i === 1 ? n : i - 1;
  next[i] = i === n ? 1 : i + 1;
}

let length = n;
let address = 1;

for (let i = 1; length > 0; i++) {
  if (i % k === 0) {
    previous[next[address]] = previous[address];
    next[previous[address]] = next[address];
    result.push(address);
    length--;
  }

  address = next[address];
}

console.log(`<${result.join(', ')}>`);
