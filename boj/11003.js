/**
 * 시간 초과
 */
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const N = input[0].split(' ')[0];
const L = input[0].split(' ')[1];
const array = input[1].split(' ');

const MAX = 5_000_000;
const deque = new Array(MAX);
let head = MAX;

const result = [];

for (let i = 0; i < N; i++) {
  const element = array[i];

  while (deque.length - head > 0 && deque[deque.length - 1].number >= element) {
    deque.pop();
  }

  deque.push({ index: i, number: element });

  while (deque.length - head > 0 && deque[head].index <= i - L) {
    deque[head++];
  }

  result.push(deque[head].number);
}

console.log(result.join(' '));
