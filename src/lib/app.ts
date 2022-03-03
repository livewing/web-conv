import type { TrackConfig } from './track';

export interface AppConfig {
  revision: 1;
  tracks: TrackConfig[];
}
type OldAppConfig = never;

export const defaultConfig = (): AppConfig => ({
  revision: 1,
  tracks: []
});

export const save = (config: AppConfig) =>
  localStorage.setItem('config', JSON.stringify(config));

export const load = () => {
  const json = localStorage.getItem('config');
  if (json === null) return defaultConfig();
  const config = JSON.parse(json) as AppConfig | OldAppConfig;
  return config;
};
