import { defaultConfig as inputDefaultConfig, type InputConfig } from './input';
import { defaultConfig as mapDefaultConfig, type MapConfig } from './map';
import { defaultConfig as synthDefaultConfig, type SynthConfig } from './synth';
import {
  defaultConfig as visualizerDefaultConfig,
  type VisualizerConfig
} from './visualizer';
import { uuid } from './uuid';

export interface TrackConfig {
  id: string;
  name: string;
  input: InputConfig;
  map: MapConfig;
  synth: SynthConfig;
  visualizer: VisualizerConfig;
}

export const defaultConfig = (): TrackConfig => ({
  id: uuid(),
  name: 'Track',
  input: inputDefaultConfig(),
  map: mapDefaultConfig(),
  synth: synthDefaultConfig(),
  visualizer: visualizerDefaultConfig()
});
