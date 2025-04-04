const [_, ...inputs] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const result = [];


for (const input of inputs) {
  const str = input.split('');

  let numberOfLogicalNot = 0;
  let numberOfFactorial = 0;
  let temp = '';

  for (let i = 0; i < str.length; i++) {
    const char = input[i];

    if (char === '1' || char === '0') {
      numberOfLogicalNot = i
      numberOfFactorial = str.length - i - 1;
      temp = char;

      if (numberOfFactorial > 0) {
        temp = '1'
      }

      if (numberOfLogicalNot % 2 !== 0) {
        temp = temp === '1' ? '0' : '1';
      }

      result.push(temp);
      break;
    }
  }
}

console.log(result.join('\n'));