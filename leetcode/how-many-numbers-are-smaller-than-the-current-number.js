/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  return nums.reduce((accumulator, current) => {
    let smallerNumbersCount = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < current) smallerNumbersCount++;
    }

    return [...accumulator, smallerNumbersCount];
  }, []);
};
