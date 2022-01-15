/**
 * 메모리 초과
 */
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [n, _] = input[0].split(' ').map(Number);
const tasks = input[1].split(' ').map(Number);

const arr = [...Array(n).keys()].map((v) => v + 1);
const deque = [...Array(n), ...arr];
let head = n;
let result = 0;

for (const task of tasks) {
  while (task !== deque[head]) {
    const index = deque.indexOf(task) - head;
    const size = deque.length - head;

    if (index < size - index) {
      deque.push(deque[head]);
      deque[head] = -1;
      head++;
    } else {
      deque[--head] = deque.pop();
    }

    result++;
  }

  deque[head] = -1;
  head++;
}

console.log(result);
