/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    let result = 0;
    let count = 0;

    [...s].forEach(element => {
        if (element === "L") {
            count += 1;
        } else if (element === "R") {
            count -= 1;
        }

        if (count === 0) {
            result += 1;
        }
    });

    return result;
};