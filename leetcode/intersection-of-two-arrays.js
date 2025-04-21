/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const MAX = 1001;
  const result = [];
  const arr1 = new Array(MAX).fill(0);
  const arr2 = new Array(MAX).fill(0);

  for (const num of nums1) {
    arr1[num] += 1
  }

  for (const num of nums2) {
    arr2[num] += 1
  }

  for (let i = 0; i < MAX; i++) {
    if (arr1[i] && arr2[i] && arr1[i] > 0 && arr2[i] > 0) {
      result.push(i);
    }
  }

  return result;
};