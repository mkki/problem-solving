const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m, k] = f.split(' ').map(Number);

const map = inputs.map((v) => v.split('').map(Number));
const visitedMap = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array(k + 1).fill(false))
);

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

let result = -1;

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

const Node = class {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
};

const Queue = class {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  shift() {
    if (this.length === 0) return undefined;

    const node = this.head;
    this.head = this.head.next;
    this.length--;
    return node.value;
  }
};

const queue = new Queue();

queue.push([0, 0, 0, 1, 1]);
visitedMap[0][0][0] = true;

while (queue.length > 0) {
  const [y, x, breakCount, isDayTime, steps] = queue.shift();

  if (y === n - 1 && x === m - 1) {
    result = steps;
    break;
  }

  const nextSteps = steps + 1;
  const nextIsDayTime = 1 - isDayTime;

  for (const [dy, dx] of directions) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (!isValid(nextY, nextX)) continue;
    if (map[nextY][nextX] === 0 && !visitedMap[nextY][nextX][breakCount]) {
      visitedMap[nextY][nextX][breakCount] = true;
      queue.push([nextY, nextX, breakCount, nextIsDayTime, nextSteps]);
    }

    if (
      map[nextY][nextX] === 1 &&
      breakCount < k &&
      !visitedMap[nextY][nextX][breakCount + 1]
    ) {
      if (isDayTime === 1) {
        visitedMap[nextY][nextX][breakCount + 1] = true;
        queue.push([nextY, nextX, breakCount + 1, nextIsDayTime, nextSteps]);
      } else {
        queue.push([y, x, breakCount, nextIsDayTime, nextSteps]);
      }
    }
  }
}

console.log(result);
