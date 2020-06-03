/*
@author:    Matt Raymond
@date:      06/02/2020
@version:   1.0.0
@purpose:   Testing
*/

const imp = require('../js/MDR');

// dB -> S/N
test('10 dB', () => {
    expect(imp.MDR.dBtoSN(10)).toBe(10);
});

test('20 dB', () => {
    expect(imp.MDR.dBtoSN(20)).toBe(100);
});

// NYQUIST
// Frequency: 1, Values: 2, MDR: 2

// Should throw errors
test('Frequency: 1, Values: 2, MDR: 2', () => {
    expect(() => {
        expect(imp.MDR.Nyquist(1, 2, 2))
    }).toThrow();
});

test('Frequency: 1', () => {
    expect(() => {
        expect(imp.MDR.Nyquist(1, undefined, undefined))
    }).toThrow();
});

test('No values', () => {
    expect(() => {
        expect(imp.MDR.Nyquist(undefined, undefined, undefined));
    }).toThrow();
});

// Should work ok
test('Frequency: 1, Values: 2', () => {
    expect(imp.MDR.Nyquist(1, 2, undefined)).toBe(2);
});

test('Values: 2, MDR: 2', () => {
    expect(imp.MDR.Nyquist(undefined, 2, 2)).toBe(1);
});

test('Frequency: 1, MDR: 2', () => {
    expect(imp.MDR.Nyquist(1, undefined, 2)).toBe(2);
});


// SHANNON
// Frequency: 3000, SN: 3162, MDR: 34881

// Should throw errors
test('Frequency: 3000, SN: 3162, MDR: 34881', () => {
    expect(() => {
        expect(imp.MDR.Shannon(3000, 3162, 34881))
    }).toThrow();
});

test('Frequency: 3000', () => {
    expect(() => {
        expect(imp.MDR.Shannon(3000, undefined, undefined))
    }).toThrow();
});

test('No values', () => {
    expect(() => {
        expect(imp.MDR.Shannon(undefined, undefined, undefined));
    }).toThrow();
});

// Should work ok
test('Frequency: 3000, SN: 3162', () => {
    expect(imp.MDR.Shannon(3000, 3162, undefined)).toBeCloseTo(34881, 0);
});

test('SN: 3162, MDR: 34881', () => {
    expect(imp.MDR.Shannon(undefined, 3162, 34881)).toBeCloseTo(3000, 0);
});

test('Frequency: 3000, MDR: 34881', () => {
    expect(imp.MDR.Shannon(3000, undefined, 34881)).toBeCloseTo(3162, 0);
});
