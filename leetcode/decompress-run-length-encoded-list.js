/**
 * @param {number[]} nums
 * @return {number[]}
 */
var decompressRLElist = function (nums) {
  let result = [];

  for (let i = 0; i < nums.length; i += 2) {
    const freq = nums[i];
    const val = nums[i + 1];
    const arr = [];

    for (let j = 0; j < freq; j++) {
      arr.push(val);
    }

    result = result.concat(arr);
  }

  return result;
};
