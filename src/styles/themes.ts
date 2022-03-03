import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    space: (n?: number) => string;
    background: string;
    color: string;
    primary: string;
    danger: string;
    border: {
      color: string;
    };
  }
}

export const common = {
  space: (n = 1) => `${n * 0.5}rem`,
  primary: 'royalblue',
  danger: 'crimson',
  border: {
    color: 'gray'
  }
};
const light: DefaultTheme = {
  ...common,
  background: 'white',
  color: 'black'
};
const dark: DefaultTheme = {
  ...common,
  background: 'black',
  color: 'white'
};
export const themes = { light, dark } as const;
