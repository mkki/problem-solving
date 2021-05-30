/**
 * @param {string} s
 * @return {boolean}
 */
var checkZeroOnes = function(s) {
    let segmentOfOne = 0;
    let segmentOfZero = 0;
    let longistSegmentOfOne = 0;
    let longistSegmentOfZero = 0;

    [...s].forEach((element) => {
        if (element === "1") {
            segmentOfOne += 1;
        } else {
            segmentOfOne = 0;
        }

        longistSegmentOfOne = Math.max(segmentOfOne, longistSegmentOfOne);

        if (element === "0") {
            segmentOfZero += 1;
        } else {
            segmentOfZero = 0;
        }

        longistSegmentOfZero = Math.max(segmentOfZero, longistSegmentOfZero);
    });
    
    return longistSegmentOfOne > longistSegmentOfZero;
};