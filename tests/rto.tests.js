/*
@author:    Matt Raymond
@date:      06/20/2020
@version:   1.0.0
@purpose:   Testing
*/

const rto = require('../js/RTO');

// Shouldn't throw errors

test('Check with RTTm [100,80,90]', () => {
    expect(rto.computeRTO([100,80,90])).toEqual(
        expect.arrayContaining([100,97.5,96.5625])
    );
});

test('Check with RTTs 100 and RTTm [80,90]', () => {
    expect(rto.computeRTO([80,90], 100)).toEqual(
        expect.arrayContaining([100,97.5,96.5625])
    );
});

test('Check with RTTs 100 and RTTm [80]', () => {
    expect(rto.computeRTO([80], 100)).toEqual(
        expect.arrayContaining([100,97.5])
    );
});

test('Check with RTTs 100 and RTTm [80]', () => {
    expect(rto.computeRTO([80], 100)).toEqual(
        expect.arrayContaining([100,97.5])
    );
});

// Should throw errors

test('Check with RTTs 100 and RTTm []', () => {
    expect(() => {
        rto.computeRTO([], 100);
    }).toThrow();
});

test('Check with RTTm [100]', () => {
    expect(() => {
        rto.computeRTO([100]);
    }).toThrow();
});
