const [n, r, c] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const getVisitedCount = (n, r, c) => {
  if (n === 0) return 0;

  const halfLength = Math.pow(2, n - 1);
  const previous = halfLength * halfLength;

  if (r < halfLength && c < halfLength) {
    return getVisitedCount(n - 1, r, c);
  } else if (r < halfLength && c >= halfLength) {
    return getVisitedCount(n - 1, r, c - halfLength) + previous;
  } else if (r >= halfLength && c < halfLength) {
    return getVisitedCount(n - 1, r - halfLength, c) + previous * 2;
  } else {
    return getVisitedCount(n - 1, r - halfLength, c - halfLength) + previous * 3;
  }
};

console.log(getVisitedCount(n, r, c));
