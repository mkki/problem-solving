const n = +require('fs').readFileSync(0, 'utf-8').trim();

const result = [];
result.push((1 << n) - 1);

/**
 * @description 원판 n개를 기둥 current에서 기둥 next로 옮기는 방법을 출력하는 함수
 */
const move = (n, current, next) => {
  if (n === 1) {
    result.push(`${current} ${next}`);
    return;
  }

  move(n - 1, current, 6 - current - next);
  result.push(`${current} ${next}`);
  move(n - 1, 6 - current - next, next);
};

move(n, 1, 3);

console.log(result.join('\n'));
