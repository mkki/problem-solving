const [f, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [N, T] = f.split(' ').map(Number);
const timeTable = [];
let result = -1;

for (const input of inputs) {
  const [s, i, c] = input.split(' ').map(Number);

  const busArray = [];
  for (let j = 0; j < c; j++) {
    busArray.push(s + i * j);
  }
  timeTable.push(...busArray);
}

timeTable.sort((a, b) => a - b);

for (const time of timeTable) {
  if (time === T) {
    result = 0;
    break;
  } else if (time > T) {
    result = time - T;
    break;
  }
}

console.log(result);
