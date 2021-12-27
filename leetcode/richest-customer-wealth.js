/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  let maxValue = 0;

  for (const account of accounts) {
    let totalAmount = 0;

    for (const amount of account) {
      totalAmount += amount;
    }

    maxValue = Math.max(maxValue, totalAmount);
  }

  return maxValue;
};
