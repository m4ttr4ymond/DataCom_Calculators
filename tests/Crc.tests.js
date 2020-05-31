const imp = require('../js/Crc');

test('CRC of data "101101" and generator "10111"', () => {
    expect(imp.Crc.genCodeword("101101", "10111")).toBe("1011011001");
});

// Day 33 CRC Page 12
test('CRC of data "1001" and generator "1011"', () => {
    expect(imp.Crc.genCodeword("1001", "1011")).toBe("1001110");
});

// https://tutorialwing.com/cyclic-redundancy-check-tutorial-with-example/
test('CRC of data "10110" and generator "1101"', () => {
    expect(imp.Crc.genCodeword("10110", "1101")).toBe("10110101");
});

// https://www.gatevidyalay.com/cyclic-redundancy-check-crc-error-detection/
// Problem 1
test('CRC of data "1101011011" and generator "10011"', () => {
    expect(imp.Crc.genCodeword("1101011011", "10011")).toBe("11010110111110");
});

// https://www.gatevidyalay.com/cyclic-redundancy-check-crc-error-detection/
// Problem 2
test('CRC of data "10011101" and generator "1001"', () => {
    expect(imp.Crc.genCodeword("10011101", "1001")).toBe("10011101100");
});

// http://ecomputernotes.com/computernetworkingnotes/communication-networks/cyclic-redundancy-check
test('CRC of data "1001" and generator "1011"', () => {
    expect(imp.Crc.genCodeword("1001", "1011")).toBe("1001110");
});
