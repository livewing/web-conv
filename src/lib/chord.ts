import { noteToStrings } from './note';

export const chordTypes = [
  '5',
  '6',
  '6sus4',
  '7',
  '7b5',
  '7sus4',
  'aug',
  'aug7',
  'augsus4',
  'augM7',
  'b5',
  'dim',
  'dim7',
  'm',
  'm6',
  'm7',
  'm7b5',
  'mM7',
  'maj',
  'M7',
  'M7b5',
  'M7sus4',
  'sus2',
  'sus4'
] as const;

export const chordIntervals: { [K in typeof chordTypes[number]]: number[] } = {
  '5': [0, 7],
  '6': [0, 4, 7, 9],
  '6sus4': [0, 5, 7, 9],
  '7': [0, 4, 7, 10],
  '7b5': [0, 4, 6, 10],
  '7sus4': [0, 5, 7, 10],
  aug: [0, 4, 8],
  aug7: [0, 4, 8, 10],
  augsus4: [0, 5, 8],
  augM7: [0, 4, 8, 11],
  b5: [0, 4, 6],
  dim: [0, 3, 6],
  dim7: [0, 3, 6, 9],
  m: [0, 3, 7],
  m6: [0, 3, 7, 9],
  m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  mM7: [0, 3, 7, 11],
  maj: [0, 4, 7],
  M7: [0, 4, 7, 11],
  M7b5: [0, 4, 6, 11],
  M7sus4: [0, 5, 7, 11],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7]
};

export interface Chord {
  root: number;
  bass: number | null;
  type: typeof chordTypes[number];
  shift: number;
  ninth: 'natural' | 'flat' | 'sharp' | null;
  eleventh: 'natural' | 'sharp' | null;
  thirteenth: 'natural' | 'flat' | null;
}

export const chordToTones = (c: Chord) =>
  [
    ...(c.bass !== null ? [-24 + c.bass, -12 + c.bass] : []),
    ...[
      ...chordIntervals[c.type],
      ...(c.ninth === 'natural'
        ? [14]
        : c.ninth === 'flat'
        ? [13]
        : c.ninth === 'sharp'
        ? [15]
        : []),
      ...(c.eleventh === 'natural' ? [17] : c.eleventh === 'sharp' ? [18] : []),
      ...(c.thirteenth === 'natural'
        ? [21]
        : c.thirteenth === 'flat'
        ? [20]
        : [])
    ].map(t => t + c.root)
  ].map(t => t + c.shift);

export interface Chords {
  up: Chord | null;
  down: Chord | null;
  left: Chord | null;
  right: Chord | null;
  a: Chord | null;
  b: Chord | null;
  x: Chord | null;
  y: Chord | null;
}
export const defaultChords = (): Chords => ({
  up: null,
  down: null,
  left: null,
  right: null,
  a: null,
  b: null,
  x: null,
  y: null
});

export type ChordSet = [
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords,
  Chords
];
export const defaultChordSet = (): ChordSet => [
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords(),
  defaultChords()
];

export interface ChordConfig {
  up: ChordSet;
  down: ChordSet;
  left: ChordSet;
  right: ChordSet;
  a: ChordSet;
  b: ChordSet;
  x: ChordSet;
  y: ChordSet;
}
export const defaultChordConfig = (): ChordConfig => ({
  up: defaultChordSet(),
  down: [
    {
      down: {
        root: 0,
        bass: 0,
        type: 'maj',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      left: {
        root: 2,
        bass: 2,
        type: 'm',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      up: {
        root: 4,
        bass: 4,
        type: 'm',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      right: {
        root: 5,
        bass: 5,
        type: 'maj',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      x: {
        root: 7,
        bass: 7,
        type: 'maj',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      y: {
        root: 9,
        bass: 9,
        type: 'm',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      b: {
        root: 11,
        bass: 11,
        type: 'dim',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      },
      a: {
        root: 6,
        bass: 6,
        type: 'm7b5',
        shift: 0,
        ninth: null,
        eleventh: null,
        thirteenth: null
      }
    },
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords(),
    defaultChords()
  ],
  left: defaultChordSet(),
  right: defaultChordSet(),
  a: defaultChordSet(),
  b: defaultChordSet(),
  x: defaultChordSet(),
  y: defaultChordSet()
});

export const chordSetMap = [
  { lb: false, rb: false, lt: false, rt: false },
  { lb: true, rb: false, lt: false, rt: false },
  { lb: false, rb: true, lt: false, rt: false },
  { lb: true, rb: true, lt: false, rt: false },
  { lb: false, rb: false, lt: true, rt: false },
  { lb: true, rb: false, lt: true, rt: false },
  { lb: false, rb: true, lt: true, rt: false },
  { lb: true, rb: true, lt: true, rt: false },
  { lb: false, rb: false, lt: false, rt: true },
  { lb: true, rb: false, lt: false, rt: true },
  { lb: false, rb: true, lt: false, rt: true },
  { lb: true, rb: true, lt: false, rt: true },
  { lb: false, rb: false, lt: true, rt: true },
  { lb: true, rb: false, lt: true, rt: true },
  { lb: false, rb: true, lt: true, rt: true },
  { lb: true, rb: true, lt: true, rt: true }
];

export const chordSetMapIndex = ({
  lb,
  rb,
  lt,
  rt
}: typeof chordSetMap[number]) =>
  chordSetMap.findIndex(
    ({ lb: elb, rb: erb, lt: elt, rt: ert }) =>
      lb === elb && rb === erb && lt === elt && rt === ert
  );

const extension = (a: 'natural' | 'flat' | 'sharp', n: number) => {
  switch (a) {
    case 'natural':
      return `${n}`;
    case 'flat':
      return `♭${n}`;
    case 'sharp':
      return `♯${n}`;
  }
};
const chordTypeToString = ({ type, ninth, eleventh, thirteenth }: Chord) => {
  const extensions = [
    [9, ninth],
    [11, eleventh],
    [13, thirteenth]
  ] as const;
  const t = (() => {
    if (
      ninth === 'natural' &&
      eleventh === 'natural' &&
      thirteenth === 'natural'
    )
      return '13';
    if (ninth === 'natural' && eleventh === 'natural' && thirteenth === null)
      return '11';
    if (ninth === 'natural' && eleventh === null && thirteenth === null)
      return '9';
    return '';
  })();
  const u =
    t === ''
      ? extensions.flatMap(([n, t]) => (t === null ? [] : [extension(t, n)]))
      : [];

  switch (type) {
    case '5':
    case 'aug':
    case 'augsus4':
    case 'b5':
    case 'dim':
    case 'm':
    case 'maj':
    case 'sus2':
    case 'sus4':
      return `${type === 'maj' ? '' : type.replace('b', '♭')}${extensions
        .flatMap(([n, t]) => (t === null ? [] : [`add${extension(t, n)}`]))
        .join('')}`;
    case '6':
    case 'm6':
      return `${type}${t}${
        u.length === 0 ? '' : u.length === 1 ? u[0] : `(${u.join()})`
      }`;
    case '6sus4':
      return `6${t}sus4${
        u.length === 0 ? '' : u.length === 1 ? u[0] : `(${u.join()})`
      }`;
    case '7':
    case '7b5':
    case '7sus4':
    case 'aug7':
    case 'augM7':
    case 'dim7':
    case 'm7':
    case 'm7b5':
    case 'mM7':
    case 'M7':
    case 'M7b5':
    case 'M7sus4':
      return `${
        t === ''
          ? type.replace('b', '♭')
          : type.replace('b', '♭').replace(/[67]/, t)
      }${u.length === 0 ? '' : u.length === 1 ? u[0] : `(${u.join()})`}`;
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = type;
    }
  }
};
export const chordToStrings = (c: Chord, key: number) =>
  noteToStrings(key + c.root, false).map(
    n =>
      `${n}${chordTypeToString(c)}${
        c.root !== c.bass && c.bass !== null
          ? '/' + noteToStrings(key + c.bass, false)[0]
          : ''
      }`
  );
