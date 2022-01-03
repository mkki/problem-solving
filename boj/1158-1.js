/**
 * Quque
 */
const input = require('fs').readFileSync(0, 'utf-8').split(' ').map(Number);

const [n, k] = input;

const list = [...Array(n).keys()].map((v) => v + 1);
const result = [];

while (list.length > 0) {
  for (let i = 0; i < k; i++) {
    if (i === k - 1) {
      result.push(list.shift());
    } else {
      const el = list.shift();
      list.push(el);
    }
  }
}

console.log(`<${result.join(', ')}>`);
