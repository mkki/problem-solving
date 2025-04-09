/**
 * @param {string} num
 * @return {boolean}
 */
var digitCount = function (num) {
  const originalNum = num;
  const numArr = num.split('');
  const count = new Array(numArr.length).fill(0);

  for (const digit of numArr) {
    count[digit]++;
  }

  return originalNum === count.join('');
};
