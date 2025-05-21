const [...inputs] = require('fs').readFileSync(0, 'utf-8').split('\n');
let tc = +inputs[0];
let inputIndex = 1;
const result = [];

while (tc-- > 0) {
  const n = +inputs[inputIndex++];
  const map = inputs[inputIndex++]
    .split(' ')
    .map(Number)
    .map((v) => v - 1);

  const visitedMap = Array(n).fill(false);
  const done = Array(n).fill(false);
  let doneCount = 0;

  for (let i = 0; i < n; i++) {
    if (visitedMap[i]) continue;

    const queue = [];
    let head = 0;

    const pathMap = new Map();

    queue.push(i);

    while (queue.length - head > 0) {
      const current = queue[head++];

      if (visitedMap[current]) {
        if (!done[current]) {
          const start = pathMap.get(current);
          if (start !== undefined) {
            doneCount += pathMap.size - start;
          }
        }
        break;
      }

      visitedMap[current] = true;
      pathMap.set(current, pathMap.size);
      queue.push(map[current]);
    }

    for (const node of pathMap.keys()) {
      done[node] = true;
    }
  }

  result.push(n - doneCount);
}

console.log(result.join('\n'));
