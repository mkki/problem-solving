const [...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

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
    this.length++;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }

    const v = this.head.v;
    this.head = this.head.next;
    this.length--;

    return v;
  }
};

const [r, c] = inputs.shift().split(' ').map(Number);
const map = inputs.map((v) => v.split(''));
const visitedMap = Array.from({ length: r }, () => Array(c).fill(false));

const swanQueue = new Queue();
const nextSwanQueue = new Queue();

const waterQueue = new Queue();

const swans = [];

const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && y < r && x >= 0 && x < c;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (map[i][j] === 'L') {
      swans.push([i, j]);
      map[i][j] = '.';
    }

    if (map[i][j] === '.') {
      waterQueue.push([i, j]);
    }
  }
}

const [initialSwanY, initialSwanX] = swans[0];
const [endSwanY, endSwanX] = swans[1];

swanQueue.push([initialSwanY, initialSwanX]);
visitedMap[initialSwanY][initialSwanX] = true;

const moveSwans = () => {
  while (swanQueue.length > 0) {
    const [y, x] = swanQueue.shift();

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (visitedMap[nextY][nextX]) continue;

      if (nextY === endSwanY && nextX === endSwanX) {
        return true;
      }

      visitedMap[nextY][nextX] = true;
      if (map[nextY][nextX] === '.') {
        swanQueue.push([nextY, nextX]);
      } else if (map[nextY][nextX] === 'X') {
        nextSwanQueue.push([nextY, nextX]);
      }
    }
  }

  return false;
};

const meltIces = () => {
  const length = waterQueue.length;

  for (let i = 0; i < length; i++) {
    const [y, x] = waterQueue.shift();

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (map[nextY][nextX] === 'X') {
        map[nextY][nextX] = '.';
        waterQueue.push([nextY, nextX]);
      }
    }
  }
};

let days = 0;

while (true) {
  if (moveSwans()) break;
  meltIces();

  while (nextSwanQueue.length > 0) {
    swanQueue.push(nextSwanQueue.shift());
  }

  days++;
}

console.log(days);
