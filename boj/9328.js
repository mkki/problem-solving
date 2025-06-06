const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let tc = +f;
let inputIndex = 0;

const resultArray = [];
const isUpperCase = (c) => c >= 'A' && c <= 'Z';
const isLowerCase = (c) => c >= 'a' && c <= 'z';

while (tc-- > 0) {
  const [h, w] = inputs[inputIndex++].split(' ').map(Number);
  const map = Array.from({ length: h + 2 }, (_, i) =>
    i === 0 || i === h + 1
      ? Array(w + 2).fill('.')
      : ['.', ...inputs[inputIndex++].split(''), '.']
  );

  const visitedMap = Array.from({ length: h + 2 }, () =>
    Array(w + 2).fill(false)
  );
  const keys = inputs[inputIndex] === '0' ? [] : inputs[inputIndex].split('');
  const keysSet = new Set(keys);

  inputIndex++;

  const doors = Array.from({ length: 26 }, () => []);

  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  const isValid = (y, x) => y >= 0 && y < h + 2 && x >= 0 && x < w + 2;
  let result = 0;

  const queue = [[0, 0]];
  let head = 0;

  visitedMap[0][0] = true;

  while (queue.length - head > 0) {
    const [y, x] = queue[head++];

    if (map[y][x] === '$') {
      result++;
      map[y][x] = '.';
    }

    if (isLowerCase(map[y][x])) {
      if (!keysSet.has(map[y][x])) {
        keysSet.add(map[y][x]);
        const targetDoor = doors[map[y][x].charCodeAt() - 97];

        while (targetDoor.length > 0) {
          queue.push(targetDoor.pop());
        }
      }
      map[y][x] = '.';
      isKeyFound = true;
    }

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (!isValid(nextY, nextX)) continue;
      if (visitedMap[nextY][nextX]) continue;
      if (map[nextY][nextX] === '*') continue;

      if (isUpperCase(map[nextY][nextX])) {
        const key = map[nextY][nextX].toLowerCase();
        if (!keysSet.has(key)) {
          doors[key.charCodeAt() - 97].push([nextY, nextX]);
          continue;
        }
      }

      visitedMap[nextY][nextX] = true;
      queue.push([nextY, nextX]);
    }
  }

  resultArray.push(result);
}

console.log(resultArray.join('\n'));
