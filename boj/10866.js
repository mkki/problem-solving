const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [_, ...tasks] = input;

const MAX = 100_000;
const deque = new Array(MAX);
let head = MAX;

const result = [];

for (const task of tasks) {
    const [command, value] = task.split(' ');

    if (command === 'push_front') {
        deque[--head] = value;
    } else if (command === 'push_back') {
        deque.push(value);
    } else if (command === 'pop_front') {
        if (deque.length - head === 0) {
            result.push(-1);
        } else {
            result.push(deque[head++]);
        }
    } else if (command === 'pop_back') {
        if (deque.length - head === 0) {
            result.push(-1);
        } else {
            result.push(deque.pop());
        }
    } else if (command === 'size') {
        result.push(deque.length - head);
    } else if (command === 'empty') {
        if (deque.length - head > 0) {
            result.push(0);
        } else {
            result.push(1);
        }
    } else if (command === 'front') {
        if (deque.length - head === 0) {
            result.push(-1);
        } else {
            result.push(deque[head]);
        }
    } else {
        if (deque.length - head === 0) {
            result.push(-1);
        } else {
            result.push(deque[deque.length - 1]);
        }
    }
}

console.log(result.join('\n'));
