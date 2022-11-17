import * as parsers from "../src/parsers";

test('X = 10', () => {
    const p = new parsers.RomanNumeralsParser('X');
    expect(p.parse()).toBe(10);
});

test('IX = 9', () => {
    const p = new parsers.RomanNumeralsParser('IX');
    expect(p.parse()).toBe(9);
});
test('IV = 4', () => {
    const p = new parsers.RomanNumeralsParser('IV');
    expect(p.parse()).toBe(4);
});

test('XL = 40', () => {
    const p = new parsers.RomanNumeralsParser('XL');
    expect(p.parse()).toBe(40);
});
test('XC = 90', () => {
    const p = new parsers.RomanNumeralsParser('XC');
    expect(p.parse()).toBe(90);
});

test('CD = 400', () => {
    const p = new parsers.RomanNumeralsParser('CD');
    expect(p.parse()).toBe(400);
});
test('CM = 900', () => {
    const p = new parsers.RomanNumeralsParser('CM');
    expect(p.parse()).toBe(900);
});


test('XIX = 19', () => {
    const p = new parsers.RomanNumeralsParser('XIX');
    expect(p.parse()).toBe(19);
});


test('MDCXCV = 1695', () => {
    const p = new parsers.RomanNumeralsParser('MDCXCV');
    expect(p.parse()).toBe(1695);
});
test('MCMLXXV = 1975', () => {
    const p = new parsers.RomanNumeralsParser('MCMLXXV');
    expect(p.parse()).toBe(1975);
});
test('MMMCMXCIX = 3999', () => {
    const p = new parsers.RomanNumeralsParser('MMMCMXCIX');
    expect(p.parse()).toBe(3999);
});


test('MMMDCCCLXXXVIII = 3888', () => {
    const p = new parsers.RomanNumeralsParser('MMMDCCCLXXXVIII');
    expect(p.parse()).toBe(3888);
});
