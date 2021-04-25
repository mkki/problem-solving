/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
    let result = 0;

    for (let i = 0; i < jewels.length; i++) {
        const jewelType = jewels.charAt(i);

        for (let j = 0; j < stones.length; j++) {
            const stoneType = stones.charAt(j);

            if (jewelType === stoneType) result++;
        }
    }

    return result;
};