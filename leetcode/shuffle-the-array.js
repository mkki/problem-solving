/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const result = [];
  const firstArray = nums.slice(0, n + 1);
  const secondArray = nums.slice(n, 2 * n + 1);

  for (let i = 0; i < n; i++) {
    result.push(firstArray[i]);
    result.push(secondArray[i]);
  }

  return result;
};
