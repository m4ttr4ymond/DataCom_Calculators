const imp = require('../js/Delay');
var m = require("../js/Mathy");

test('Bits: 720000, Transmission Rate: 240000', () => {
    expect(imp.Delay.tDelay([720000, m.Units.Bit], [240000, m.Units.Bit])).toEqual([3, m.Units.second]);
});
