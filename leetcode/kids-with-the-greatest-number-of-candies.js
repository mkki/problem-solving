/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  let result = [];
  let maximumNumberOfCandies = 0;

  for (const candy of candies) {
    maximumNumberOfCandies = Math.max(maximumNumberOfCandies, candy);
  }

  for (const candy of candies) {
    const modifiedNumberOfCandies = candy + extraCandies;

    if (modifiedNumberOfCandies >= maximumNumberOfCandies) {
      result.push(true);
    } else {
      result.push(false);
    }
  }

  return result;
};
