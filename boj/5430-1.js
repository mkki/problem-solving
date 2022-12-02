/**
 * 시간 초과
 */
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [testcase, ...string] = input;

const MAX = 100_000;
const result = [];

for (let i = 0; i < testcase; i++) {
  const index = i * 3;
  const commands = string[index].split('');
  const arr = string[index + 2]
    .split('')
    .filter(element => element !== '[' && element !== ']')
    .join('')
    .split(',');

  const deque = new Array(MAX);
  let head = MAX;
  let isError = false;

  for (const element of arr) {
    if (element !== '') {
      deque.push(element);
    }
  }

  for (const command of commands) {
    if (command === 'R') {
      for (let j = 0; j < (deque.length - head) / 2; j++) {
        const temp = deque[head + j];
        deque[head + j] = deque[deque.length - 1 - j];
        deque[deque.length - 1 - j] = temp;
      }
    } else if (command === 'D') {
      if (deque.length - head === 0) {
        isError = true;
        break;
      } else {
        deque[head++];
      }
    }
  }

  if (isError) {
    result.push('error');
  } else {
    const resultString = deque.slice(head).join(',');
    result.push(`[${resultString}]`);
  }
}

console.log(result.join('\n'));
