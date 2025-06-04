const [n, k] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const MAX = 500_000;
const visitedMap = Array.from({ length: MAX + 1 }, () => Array(2).fill(false));

const directions = [(x) => x + 1, (x) => x - 1, (x) => x * 2];

const isValid = (x) => x >= 0 && x <= MAX;

const queue = [n];
let head = 0;

visitedMap[n][0] = true;

const bfs = () => {
  let time = 0;

  while (queue.length - head > 0) {
    const size = queue.length - head;

    const nextK = k + (time * (time + 1)) / 2;

    if (nextK > MAX) {
      return -1;
    }

    if (visitedMap[nextK][time % 2]) {
      return time;
    }

    for (let i = 0; i < size; i++) {
      const x = queue[head++];

      for (const direction of directions) {
        const nextX = direction(x);

        if (!isValid(nextX)) continue;
        if (visitedMap[nextX][(time + 1) % 2]) continue;

        visitedMap[nextX][(time + 1) % 2] = true;
        queue.push(nextX);
      }
    }

    time++;
  }

  return -1;
};

console.log(bfs());
