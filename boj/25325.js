const [_, ...inputs] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const map = new Map();
const students = inputs[0].trim().split(' ');

for (const student of students) {
  map.set(student, 0);
}

const favorites = inputs.slice(1);

for (const favorite of favorites) {
  const studentList = favorite.trim().split(' ');

  for (const student of studentList) {
    if (map.has(student)) {
      map.set(student, map.get(student) + 1);
    }
  }
}

console.log(
  [...map]
    .sort(([k1, v1], [k2, v2]) => {
      if (v1 > v2) return -1;
      else if (v1 < v2) return 1;
      else {
        if (k1 < k2) return -1;
        else if (k1 < k2) return -1;
        else return 0;
      }
    })
    .map(([k, v]) => `${k} ${v}`)
    .join('\n')
);
