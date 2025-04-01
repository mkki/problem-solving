const inputs = require('fs').readFileSync(0, 'utf-8').toString().split('\n');

const result = [];

for (const input of inputs) {
  if (input === '') {
    continue;
  }

  const str = input.split('');
  let lower = 0;
  let upper = 0;
  let number = 0;
  let whitespace = 0;

  for (const char of str) {
    if (char >= 'a' && char <= 'z') {
      lower++;
    } else if (char >= 'A' && char <= 'Z') {
      upper++;
    } else if (char >= '0' && char <= '9') {
      number++;
    } else if (char === ' ') {
      whitespace++;
    }
  }

  result.push(`${lower} ${upper} ${number} ${whitespace}`);
}

console.log(result.join('\n'));
