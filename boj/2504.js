/**
 * 분배 법칙으로 식을 간단하게 변형해야 풀이가 가능하다.('[[][]]'는 '[[]][[]]'와 동일)
 * 10799번과 유사하게 이전 값을 input 내에서 구해야 한다.
 */

const input = require('fs').readFileSync(0, 'utf-8').trim().split('');
const stack = [];
let result = 0;
let tempResult = 1;

for (let i = 0; i < input.length; i++) {
  const current = input[i];

  if (stack.length === 0) {
    if (current === ')' || current === ']') {
      result = 0;
      break;
    }
  }

  if (current === '(') {
    tempResult *= 2;
    stack.push(current);
  } else if (current === '[') {
    tempResult *= 3;
    stack.push(current);
  } else {
    const previous = stack[stack.length - 1];

    stack.pop();

    if (current === ')' && previous === '(') {
      if (input[i - 1] === '(') {
        result += tempResult;
      }
      tempResult /= 2;
    } else if (current === ']' && previous === '[') {
      if (input[i - 1] === '[') {
        result += tempResult;
      }
      tempResult /= 3;
    } else {
      result = 0;
      break;
    }
  }
}

if (stack.length > 0) {
  result = 0;
}

console.log(result);
