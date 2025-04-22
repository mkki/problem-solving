/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function (arr1, arr2, d) {
  const sortedArray = [...arr2].sort((a, b) => a - b);
  let result = 0;

  for (const firstNumber of arr1) {
    let isValid = true;
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const secondNumber = sortedArray[mid];

      if (Math.abs(firstNumber - secondNumber) <= d) {
        isValid = false;
        break;
      } else if (firstNumber < secondNumber) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    if (isValid) {
      result++;
    }
  }

  return result;
};
