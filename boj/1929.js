const [start, end] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

function isPrime(end) {
  const array = new Array(end + 1).fill(true);
  array[0] = false;
  array[1] = false;

  for (let i = 2; i * i <= end; i++) {
    for (let j = i; j <= end; j += i) {
      if (j != i && j % i === 0) {
        array[j] = false;
      }
    }
  }

  return array;
}

const primeArray = isPrime(end)
  .map((v, i) => (v ? i : 0))
  .filter((v) => v !== 0)
  .filter((v) => v >= start);

console.log(primeArray.join('\n'));
