/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    let result = [];

    nums.reduce((accumulator, current) => {
        accumulator += current;
        result.push(accumulator);

        return accumulator;
    }, 0);

    return result;
};