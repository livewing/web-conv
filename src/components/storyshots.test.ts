/**
 * @jest-environment jsdom
 */

import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';
import 'jest-styled-components';

jest.mock('global', () =>
  Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: '' } })
);
jest.mock('i18next', () => ({
  isInitialized: true,
  changeLanguage: () => void 0
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: unknown) => s,
    i18n: {
      changeLanguage: () => Promise.resolve()
    }
  }),
  Trans: ({ i18nKey, children }: { i18nKey: string; children: unknown }) => [
    i18nKey,
    children
  ]
}));
jest.mock('../lib/i18n', () => ({
  getResources: () => ({})
}));
jest.mock('../hooks/gamepad', () => ({
  getGamepadsSnapshot: () => [],
  useGamepadsImpl: () => [],
  useGamepadButtonEvent: () => void 0
}));
jest.mock('../hooks/synth');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const reactTestingLibrarySerializer: jest.SnapshotSerializerPlugin = {
  print: (val, serialize) =>
    serialize(
      (val as { container: { firstChild: unknown } }).container.firstChild
    ),
  test: val => typeof val === 'object' && 'container' in val
};

initStoryshots({
  renderer: render,
  snapshotSerializers: [reactTestingLibrarySerializer]
});
