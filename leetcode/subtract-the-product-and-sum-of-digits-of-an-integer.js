/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function (n) {
  return (
    [...(n + "")].reduce((acc, el) => (acc *= parseInt(el)), 1) -
    [...(n + "")].reduce((acc, el) => (acc += parseInt(el)), 0)
  );
};
