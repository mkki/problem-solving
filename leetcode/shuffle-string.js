/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function(s, indices) {
    return [...s].reduce((acc, el, index) => {
        acc[indices[index]] = el;
        return acc;
    }, []).join("");
};