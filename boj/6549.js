const inputs = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const result = [];

for (const input of inputs) {
  const [n, ...squares] = input.split(' ').map(Number);

  if (n === 0) break;

  const stack = [];
  let max = 0;

  for (let i = 0; i < n; i++) {
    let index = i;

    while (stack.length && stack[stack.length - 1].height >= squares[i]) {
      const area =
        (i - stack[stack.length - 1].index) * stack[stack.length - 1].height;

      max = Math.max(area, max);

      index = stack[stack.length - 1].index;

      stack.pop();
    }

    stack.push({
      height: squares[i],
      index: index,
    });
  }

  while (stack.length) {
    const area =
      (n - stack[stack.length - 1].index) * stack[stack.length - 1].height;

    max = Math.max(area, max);

    stack.pop();
  }

  result.push(max);
}

console.log(result.join('\n'));
