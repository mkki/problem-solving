/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  let checksums = new Array(26);
  const splitedSentence = sentence.split("");

  for (const element of splitedSentence) {
    const index = element.charCodeAt(0) - 97;
    checksums[index] = true;
  }

  for (const element of checksums) {
    if (!element) {
      return false;
    }
  }

  return true;
};
