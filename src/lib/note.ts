const noteMap = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11
} as const;
const accidentialMap = {
  bb: -2,
  b: -1,
  '#': 1,
  x: 2
} as const;

const notes = [
  ['C'],
  ['C♯', 'D♭'],
  ['D'],
  ['D♯', 'E♭'],
  ['E'],
  ['F'],
  ['F♯', 'G♭'],
  ['G'],
  ['G♯', 'A♭'],
  ['A'],
  ['A♯', 'B♭'],
  ['B']
] as const;
export const noteToStrings = (n: number, showOctave = true) =>
  notes[n % 12].map(a => (showOctave ? `${a}${Math.floor(n / 12) - 1}` : a));

export const parseNote = (s: string): number | undefined => {
  const m = s.match(/^([A-Ga-g])(bb|b|#|x)?(-?\d+)$/);
  if (m === null) return void 0;
  const n = noteMap[m[1].toUpperCase() as keyof typeof noteMap];
  const a =
    typeof m[2] === 'undefined'
      ? 0
      : accidentialMap[m[2] as keyof typeof accidentialMap];
  const o = Number(m[3]);
  return n + a + (o + 1) * 12;
};

export const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;
