export interface ADSREnvelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface CommonOscillatorOption {
  detune: number;
  envelope: ADSREnvelope;
  volume: number;
}
export interface SimpleOscillatorOption extends CommonOscillatorOption {
  type: 'sine' | 'square' | 'triangle' | 'sawtooth';
}
export interface FatOscillatorOption extends CommonOscillatorOption {
  type: 'fatsine' | 'fatsquare' | 'fattriangle' | 'fatsawtooth';
  count: number;
  spread: number;
}

export const oscillatorTypes: Oscillator['option']['type'][] = [
  'sine',
  'square',
  'triangle',
  'sawtooth',
  'fatsine',
  'fatsquare',
  'fattriangle',
  'fatsawtooth'
];

export const isFatOscillatorOptionType = (
  optionType: Oscillator['option']['type']
): optionType is FatOscillatorOption['type'] =>
  optionType === 'fatsawtooth' ||
  optionType === 'fatsine' ||
  optionType === 'fatsquare' ||
  optionType === 'fattriangle';
export const isFatOscillatorOption = (
  optionType: Oscillator['option']
): optionType is FatOscillatorOption =>
  isFatOscillatorOptionType(optionType.type);

interface Oscillator {
  type: 'oscillator';
  option: SimpleOscillatorOption | FatOscillatorOption;
}
export interface SynthConfig {
  source: Oscillator;
}

export const defaultConfig = (): SynthConfig => ({
  source: {
    type: 'oscillator',
    option: {
      type: 'fatsawtooth',
      detune: 0,
      count: 3,
      spread: 20,
      volume: 0.1,
      envelope: {
        attack: 0,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    }
  }
});
