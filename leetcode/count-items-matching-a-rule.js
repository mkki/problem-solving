/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
  let result = 0;
  let index;

  switch (ruleKey) {
    case "type":
      index = 0;
      break;
    case "color":
      index = 1;
      break;
    default:
      index = 2;
      break;
  }

  for (item of items) {
    if (item[index] === ruleValue) {
      result += 1;
    }
  }

  return result;
};
