/**
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
  let result = "";
  let isParentheses = false;

  [...command].forEach((element) => {
    if (element === "(") {
      isParentheses = true;
      return;
    }

    if (element === ")") {
      if (isParentheses) {
        result += "o";
        isParentheses = false;
      }

      return;
    }

    result += element;
    isParentheses = false;
  });

  return result;
};
