const [f, input] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [l, c] = f.split(' ').map(Number);
const chars = input.split(' ').sort();

const result = [];
const currentChars = [];

const recursive = (index, count) => {
  if (count === l) {
    let aCount = 0;

    ['a', 'e', 'i', 'o', 'u'].forEach((v) => {
      if (currentChars.indexOf(v) !== -1) {
        aCount++;
      }
    });

    const bCount = currentChars.length - aCount;

    if (aCount > 0 && bCount > 1) {
      result.push(currentChars.join(''));
    }

    return;
  }

  for (let i = index; i < c; i++) {
    const char = chars[i];
    currentChars[count] = char;
    recursive(i + 1, count + 1);
  }
};

recursive(0, 0);

console.log(result.join('\n'));
