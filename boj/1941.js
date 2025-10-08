const map = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((v) => v.split(''));

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

    const node = this.head.v;
    this.head = this.head.next;
    this.length -= 1;
    return node;
  }
};

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (y, x) => y >= 0 && x >= 0 && y < 5 && x < 5;

const getCombinations = (n, m) => {
  const combinations = [];
  const current = [];

  const recursive = (count, index) => {
    if (count === m) {
      combinations.push(current.slice());
      return;
    }

    for (let i = index; i < n; i++) {
      current[count] = i;
      recursive(count + 1, i + 1);
    }
  };

  recursive(0, 0);

  return combinations;
};

let result = 0;
const combinations = getCombinations(25, 7);

for (const combination of combinations) {
  let count = 0;
  let sCount = 0;
  const visitedMap = Array(25).fill(false);

  const queue = new Queue();
  queue.push(combination[0]);
  visitedMap[combination[0]] = true;

  while (queue.length > 0) {
    const current = queue.shift();

    const y = Math.floor(current / 5);
    const x = current % 5;

    count++;
    if (map[y][x] === 'S') {
      sCount++;
    }

    for (const [dy, dx] of dir) {
      const ny = dy + y;
      const nx = dx + x;
      const nIndex = ny * 5 + nx;
      if (!isValid(ny, nx)) continue;
      if (combination.indexOf(nIndex) === -1) continue;
      if (visitedMap[nIndex]) continue;
      visitedMap[nIndex] = true;
      queue.push(nIndex);
    }
  }

  if (count >= 7 && sCount >= 4) {
    result++;
  }
}

console.log(result);
