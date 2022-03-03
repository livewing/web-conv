import { uuid } from './uuid';

interface VisualizerBase {
  id: string;
}

export interface NoteName extends VisualizerBase {
  type: 'note-name';
  showOctave: boolean;
  showButton: boolean;
}

export interface Keyboard extends VisualizerBase {
  type: 'keyboard';
  pitch: 'absolute' | 'relative';
  range: number;
  highlightStandby: boolean;
}

export interface Innocence extends VisualizerBase {
  type: 'innocence';
  shape: 'random' | 'line' | 'square' | 'triangle' | 'circle';
}

export type Visualizer = NoteName | Keyboard | Innocence;

export const visualizerTypes: Visualizer['type'][] = [
  'note-name',
  'keyboard',
  'innocence'
];

export type VisualizerConfig = Visualizer[];

export const defaultConfig = (): VisualizerConfig => [
  defaultVisualizerConfig('note-name'),
  defaultVisualizerConfig('keyboard')
];

export const defaultVisualizerConfig = <
  T extends Visualizer['type'],
  V extends Extract<Visualizer, { type: T }>
>(
  type: T
): V => {
  const id = uuid();
  switch (type) {
    case 'note-name': {
      const c: NoteName = { id, type, showOctave: true, showButton: true };
      return c as V;
    }
    case 'keyboard': {
      const c: Keyboard = {
        id,
        type,
        pitch: 'relative',
        range: 2,
        highlightStandby: true
      };
      return c as V;
    }
    case 'innocence': {
      const c: Innocence = { id, type, shape: 'random' };
      return c as V;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = type;
      throw new Error();
    }
  }
};
