const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...tasks] = input;

const result = [];
const queue = [];
let head = 0;

for (const task of tasks) {
  const [command, value] = task.split(' ');

  switch (command) {
    case 'push':
      queue.push(value);
      break;
    case 'pop':
      if (queue.length - head > 0) {
        result.push(queue[head++]);
      } else {
        result.push(-1);
      }
      break;
    case 'size':
      result.push(queue.length - head);
      break;
    case 'empty':
      if (queue.length - head === 0) {
        result.push(1);
      } else {
        result.push(0);
      }
      break;
    case 'front':
      if (queue.length - head > 0) {
        result.push(queue[head]);
      } else {
        result.push(-1);
      }
      break;
    case 'back':
      if (queue.length - head > 0) {
        result.push(queue[queue.length - 1]);
      } else {
        result.push(-1);
      }
      break;
  }
}

console.log(result.join('\n'));
