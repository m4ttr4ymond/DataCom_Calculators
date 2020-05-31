/*
@author:    Matt Raymond
@date:      05/31/2020
@version:   1.0.0
@purpose:   Testing
*/

const imp = require('../js/Subnet');

// Using 126.168.0.1 on all mask types

// None
test('IP address of "126.168.0.1" and subnet mask of "0.0.0.0"', () => {
    expect(imp.Subnet.getSubnetInfo("126.168.0.1", "0.0.0.0")).toEqual(["0.0.0.0", "255.255.255.255"]);
});

// A
test('IP address of "126.168.0.1" and subnet mask of "255.0.0.0"', () => {
    expect(imp.Subnet.getSubnetInfo("126.168.0.1", "255.0.0.0")).toEqual(["126.0.0.0", "126.255.255.255"]);
});

// B
test('IP address of "126.168.0.1" and subnet mask of "255.255.0.0"', () => {
    expect(imp.Subnet.getSubnetInfo("126.168.0.1", "255.255.0.0")).toEqual(["126.168.0.0", "126.168.255.255"]);
});

// C
test('IP address of "126.168.0.1" and subnet mask of "255.255.255.0"', () => {
    expect(imp.Subnet.getSubnetInfo("126.168.0.1", "255.255.255.0")).toEqual(["126.168.0.0", "126.168.0.255"]);
});

// Single
test('IP address of "126.168.0.1" and subnet mask of "255.255.255.255"', () => {
    expect(imp.Subnet.getSubnetInfo("126.168.0.1", "255.255.255.255")).toEqual(["126.168.0.1", "126.168.0.1"]);
});


// Using other addresses/masks
test('IP address of "195.45.219.72" and subnet mask of "255.255.255.192"', () => {
    expect(imp.Subnet.getSubnetInfo("195.45.219.72", "255.255.255.192")).toEqual(["195.45.219.64", "195.45.219.127"]);
});
