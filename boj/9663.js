const n = +require('fs').readFileSync(0, 'utf-8').trim();

let count = 0;
const visitMap1 = Array.from({ length: n + 1 }).fill(false);
const visitMap2 = Array.from({ length: n + 1 }).fill(false);
const visitMap3 = Array.from({ length: n + 1 }).fill(false);

const recursive = (y) => {
  if (y === n) {
    count++;
    return;
  }

  for (let x = 0; x < n; x++) {
    if (visitMap1[x] || visitMap2[x + y] || visitMap3[y - x + n - 1]) {
      continue;
    }

    visitMap1[x] = true;
    visitMap2[x + y] = true;
    visitMap3[y - x + n - 1] = true;
    recursive(y + 1);
    visitMap1[x] = false;
    visitMap2[x + y] = false;
    visitMap3[y - x + n - 1] = false;
  }
};

recursive(0);

console.log(count);
