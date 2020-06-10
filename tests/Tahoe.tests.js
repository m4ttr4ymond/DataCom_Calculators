/*
@author:    Matt Raymond
@date:
@version:   1.0.0
@purpose:   Testing
*/

const i1 = require('../js/Tahoe');
const i2 = require('../js/TcpSnapshot');

test('Testing Tahoe TCP', () => {
    expect(function() {
        sn = i2.TcpSnapshot();
        t = i1.Tahoe(sn, null);
        t.runSim();
    }).toBeFalsy();
});
