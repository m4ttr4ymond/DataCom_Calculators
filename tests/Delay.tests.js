/*
@author:    Matt Raymond
@date:      06/05/2020
@version:   1.0.0
@purpose:   Testing
*/

// Incomplete

const imp = require('../js/Delay');
var m = require("../js/Mathy");

// Transmission delay
test('Bits: 720 KB, Transmission Rate: 240 KB', () => {
    expect(imp.Delay.tDelay([720, m.Units.KB], [240, m.Units.KB])).toEqual([3, m.Units.second]);
});

test('Bits: 720 MB, Transmission Rate: 240 KB', () => {
    expect(imp.Delay.tDelay([720, m.Units.MB], [240, m.Units.KB])).toEqual([3000, m.Units.second]);
});

// Propagation delay
test('Distance: 4000 km, Propegation Rate: 240 KB', () => {
    expect(imp.Delay.pDelay([4000, m.Units.Km], [2 * 10 ** 8, m.Units.m])).toEqual([0.02, m.Units.second]);
});

test('Distance: 4000 km, Propegation Rate: 240 KB', () => {
    expect(imp.Delay.pDelay([4000, m.Units.Km], [2 * 10 ** 8, m.Units.m])).toEqual([0.02, m.Units.second]);
});
