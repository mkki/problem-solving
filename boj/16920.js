const [f, s, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [n, m, p] = f.split(' ').map(Number);
const [...sArray] = s.split(' ').map(Number);
const map = inputs.map((v) => v.split(''));

const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

const Node = class {
  constructor(v) {
    this.v = v;
    this.next = null;
  }
};

const Queue = class {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(v) {
    const node = new Node(v);

    if (this.length === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length += 1;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }

    const returnedNode = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return returnedNode.v;
  }
};

const result = Array(p + 1).fill(0);
const queues = Array.from({ length: p + 1 }, () => new Queue());

for (let i = 0; i < p; i++) {
  const pIndex = i + 1 + '';

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (map[y][x] === pIndex) {
        result[pIndex] += 1;
        queues[pIndex].push([y, x]);
      }
    }
  }
}

while (true) {
  let anyExpanded = false;

  for (let pIndex = 1; pIndex <= p; pIndex++) {
    const currentQueue = queues[pIndex];
    const currentS = sArray[pIndex - 1];

    for (let i = 0; i < currentS; i++) {
      const length = currentQueue.length;
      if (length === 0) break;

      for (let j = 0; j < length; j++) {
        const [y, x] = currentQueue.shift();

        for (const [dy, dx] of directions) {
          const nextY = y + dy;
          const nextX = x + dx;

          if (!isValid(nextY, nextX)) continue;
          if (map[nextY][nextX] === '.') {
            map[nextY][nextX] = pIndex + '';
            result[pIndex] += 1;
            currentQueue.push([nextY, nextX]);
            anyExpanded = true;
          }
        }
      }
    }
  }

  if (!anyExpanded) break;
}

console.log(result.slice(1).join(' '));
