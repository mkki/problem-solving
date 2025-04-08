const n = +require('fs').readFileSync(0, 'utf-8').trim();

const fibo = new Array(n + 1).fill(0);

fibo[1] = 1n;
fibo[2] = 1n;
fibo[3] = 1n;

const fiboFunction = (n) => {
  if (fibo[n] > 0) {
    return fibo[n];
  }

  let result = fiboFunction(n - 1) + fiboFunction(n - 3);
  fibo[n] = result;

  return result;
};

fiboFunction(n);

console.log(fibo[n].toString());
