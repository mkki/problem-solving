/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    let numberOfGoodPairs = 0;

    for (let i = 1; i <= 100; i++) {
        let count = 0;

        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) count++;
        }

        if (count > 0) {
            numberOfGoodPairs += count * (count - 1) / 2;
        }
    }

    return numberOfGoodPairs
};