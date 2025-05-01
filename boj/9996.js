const [n, pattern, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const result = [];
const [p1, p2] = pattern.split('*');

for (const file of inputs) {
  if (
    file.length >= p1.length + p2.length &&
    file.startsWith(p1) &&
    file.endsWith(p2)
  ) {
    result.push('DA');
  } else {
    result.push('NE');
  }
}

console.log(result.join('\n'));
