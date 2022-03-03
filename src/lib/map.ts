import { defaultChordConfig, type ChordConfig } from './chord';
import type { InputConfig } from './input';

export type Scale = keyof typeof scales;

export interface Shift {
  type: 'shift';
  amount: number;
}
interface Sustain {
  type: 'sustain';
}
export type Modifier = Shift | Sustain;
export type ShiftMode = Shift;

export interface MapConfig {
  key: number;
  playMode: 'melody' | 'chord';
  shiftMode: {
    lb: ShiftMode;
    rb: ShiftMode;
    lt: ShiftMode;
    rt: ShiftMode;
  };
  melody: {
    layout: 'anacon-midi-conv' | 'band-brothers';
    keyButton: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    scale: Scale;
    functions: {
      lb: Modifier;
      rb: Modifier;
      lt: Modifier;
      rt: Modifier;
    };
  };
  chord: {
    currentSet: keyof ChordConfig;
    chords: ChordConfig;
  };
}

type Button = keyof InputConfig;
export const layouts: {
  [_ in MapConfig['melody']['layout']]: [
    Button,
    Button,
    Button,
    Button,
    Button,
    Button,
    Button,
    Button
  ];
} = {
  'anacon-midi-conv': ['down', 'left', 'up', 'right', 'x', 'y', 'b', 'a'],
  'band-brothers': ['down', 'left', 'up', 'right', 'x', 'a', 'b', 'y']
};

export const scales = {
  ionian: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrigian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  'harmonic-minor': [0, 2, 3, 5, 7, 8, 11],
  'melodic-minor': [0, 2, 3, 5, 7, 9, 11]
} as const;
export const scaleList: readonly Scale[] = [
  'ionian',
  'dorian',
  'phrigian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
  'harmonic-minor',
  'melodic-minor'
] as const;

export const defaultConfig = (): MapConfig => ({
  key: 60,
  playMode: 'melody',
  shiftMode: {
    lb: { type: 'shift', amount: 12 },
    rb: { type: 'shift', amount: 1 },
    lt: { type: 'shift', amount: -12 },
    rt: { type: 'shift', amount: -1 }
  },
  melody: {
    layout: 'anacon-midi-conv',
    keyButton: 3,
    scale: 'ionian',
    functions: {
      lb: { type: 'shift', amount: 12 },
      rb: { type: 'shift', amount: 1 },
      lt: { type: 'shift', amount: -12 },
      rt: { type: 'shift', amount: -1 }
    }
  },
  chord: {
    currentSet: 'down',
    chords: defaultChordConfig()
  }
});

export const isNoteButton = (
  button: keyof InputConfig
): button is 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'x' | 'y' =>
  button === 'up' ||
  button === 'down' ||
  button === 'left' ||
  button === 'right' ||
  button === 'a' ||
  button === 'b' ||
  button === 'x' ||
  button === 'y';

export const isFunctionButton = (
  button: keyof InputConfig
): button is 'lb' | 'rb' | 'lt' | 'rt' =>
  button === 'lb' || button === 'rb' || button === 'lt' || button === 'rt';

export const buttonToMidiNote = (
  config: MapConfig,
  button: keyof InputConfig
): number | undefined => {
  const i = layouts[config.melody.layout].indexOf(button);
  if (i === -1) return void 0;
  const j = i - config.melody.keyButton;
  return (
    config.key +
    scales[config.melody.scale][(7 + j) % 7] +
    12 * (j < 0 ? -1 : j >= 7 ? 1 : 0)
  );
};
