const [total, ...names] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const nameLength = names[0].length;
let result = '';

for (let i = 0; i < nameLength; i++) {
  let flag = true;

  for (let j = 0; j < total - 1; j++) {
    const current = names[j][i];
    const next = names[j + 1][i];

    if (current !== next) {
      flag = false;
      break;
    }
  }

  if (flag) {
    result += names[0][i];
  } else {
    result += '?';
  }
};

console.log(result);