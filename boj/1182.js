const [f, input] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [n, s] = f.split(' ').map(Number);
const numbers = input.split(' ').map(Number);

let count = 0;

const recursive = (index, sum) => {
  if (index === n) {
    if (sum === s) {
      count++;
    }
    return;
  }

  recursive(index + 1, sum + numbers[index]);
  recursive(index + 1, sum);
};

recursive(0, 0);

if (s === 0) {
  count--;
}

console.log(count);
