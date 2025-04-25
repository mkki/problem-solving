const inputs = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let result = [];
let i = 0;

while (true) {
  const [n, m] = inputs[i].split(' ').map(Number);
  i++;
  if (n === 0 && m === 0) break;

  let count = 0;
  const a = inputs.slice(i, n + i).map(Number);
  const b = inputs.slice(n + i, n + m + i).map(Number);
  i += n + m;

  for (const target of b) {
    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (a[mid] === target) {
        count++;
        break;
      } else if (a[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  result.push(count);
}

console.log(result.join('\n'));
