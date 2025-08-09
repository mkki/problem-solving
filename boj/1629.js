/**
 * @description BigInt는 연산 후 소수부를 무조건 버림
 */
const [a, b, c] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(BigInt);

const solve = (a, b, c) => {
  if (b === 1n) {
    return a % c;
  }

  let value = solve(a, b / 2n, c);

  if (b % 2n === 0n) {
    value = (value * value) % c;
  } else {
    value = (value * value * a) % c;
  }

  return value;
};

const result = solve(a, b, c);

console.log(result.toString());
