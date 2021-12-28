import { RomanNumeralsParser } from "../romannumeralsparser"

test('X = 10', () => {
    var p = new RomanNumeralsParser('X');
    expect(p.parse()).toBe(10);
});

test('IX = 9', () => {
    var p = new RomanNumeralsParser('IX');
    expect(p.parse()).toBe(9);
});
test('IV = 4', () => {
    var p = new RomanNumeralsParser('IV');
    expect(p.parse()).toBe(4);
});

test('XL = 40', () => {
    var p = new RomanNumeralsParser('XL');
    expect(p.parse()).toBe(40);
});
test('XC = 90', () => {
    var p = new RomanNumeralsParser('XC');
    expect(p.parse()).toBe(90);
});

test('CD = 400', () => {
    var p = new RomanNumeralsParser('CD');
    expect(p.parse()).toBe(400);
});
test('CM = 900', () => {
    var p = new RomanNumeralsParser('CM');
    expect(p.parse()).toBe(900);
});


test('XIX = 19', () => {
    var p = new RomanNumeralsParser('XIX');
    expect(p.parse()).toBe(19);
});


test('MCMLXXV = 1975', () => {
    var p = new RomanNumeralsParser('MCMLXXV');
    expect(p.parse()).toBe(1975);
});
test('MMMCMXCIX = 3999', () => {
    var p = new RomanNumeralsParser('MMMCMXCIX');
    expect(p.parse()).toBe(3999);
});


test('MMMDCCCLXXXVIII = 3888', () => {
    var p = new RomanNumeralsParser('MMMDCCCLXXXVIII');
    expect(p.parse()).toBe(3888);
});
