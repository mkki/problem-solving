const [_, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const result = inputs
  .sort((a, b) => {
    if (a.length !== b.length) {
      return a.length > b.length ? 1 : -1;
    } else {
      return a > b ? 1 : -1;
    }
  })
  .reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur) {
      acc.push(cur);
    }
    return acc;
  }, []);

console.log(result.join('\n'));
