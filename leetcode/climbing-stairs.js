/**
 * @param {number} n
 * @return {number}
 */

function fibo(n, arr) {
  if (n < 2) {
    return 1;
  }

  if (arr[n]) {
    return arr[n];
  }

  arr[n] = arr[n - 1] + arr[n - 2];

  return fibo(n - 1, arr) + fibo(n - 2, arr);
}

var climbStairs = function (n) {
  const arr = new Array(n);
  arr[0] = 1;
  arr[1] = 1;
  return fibo(n, arr);
};
