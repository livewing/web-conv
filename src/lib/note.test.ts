import { noteToStrings, parseNote } from './note';

describe('noteToString', () => {
  test('0', () => {
    expect(noteToStrings(0)).toEqual(['C-1']);
  });

  test('60', () => {
    expect(noteToStrings(60)).toEqual(['C4']);
  });

  test('127', () => {
    expect(noteToStrings(127)).toEqual(['G9']);
  });
});

describe('parseNote', () => {
  test('C4', () => {
    expect(parseNote('C4')).toBe(60);
  });

  test('c-1', () => {
    expect(parseNote('c-1')).toBe(0);
  });

  test('g9', () => {
    expect(parseNote('g9')).toBe(127);
  });

  test('D#4', () => {
    expect(parseNote('D#4')).toBe(63);
  });

  test('Eb4', () => {
    expect(parseNote('Eb4')).toBe(63);
  });

  test('Cx5', () => {
    expect(parseNote('Cx5')).toBe(74);
  });

  test('Cbb5', () => {
    expect(parseNote('Cbb5')).toBe(70);
  });
});
