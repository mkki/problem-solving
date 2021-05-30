/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function(encoded, first) {
    const decoded = [];

    decoded.push(first);

    for (let i = 0; i < encoded.length; i++) {
        const decodedNumber = encoded[i] ^ decoded[i];

        decoded.push(decodedNumber);
    }

    return decoded;
};