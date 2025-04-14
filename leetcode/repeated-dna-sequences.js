/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {
  const sArray = s.split('');
  const sLength = sArray.length;
  const hashMap = new Map();

  for (let i = 0; i <= sLength - 10; i++) {
    const char = sArray[i];
    const currentSubstring = sArray.slice(i, i + 10).join('');

    if (hashMap.has(currentSubstring)) {
      const previousCount = hashMap.get(currentSubstring);
      hashMap.set(currentSubstring, previousCount + 1);
    } else {
      hashMap.set(currentSubstring, 1)
    }
  }

  return [...hashMap].filter(([_, v]) => v > 1).map((([k, _]) => k));
};