import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'storybook-dark-mode';
import i18next from 'i18next';
import { GamepadProvider } from '../src/contexts/gamepad';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { themes } from '../src/styles/themes';
import { getResources, initI18n } from '../src/lib/i18n';
import type { Meta } from '@storybook/react';
import type { ToolbarArgType } from '@storybook/addon-toolbars/dist/ts3.9/types';

const i18nResources = getResources();

export const loaders = [
  async () => {
    if (!i18next.isInitialized) {
      await initI18n({ useDetector: false, lng: 'en' });
    }
  }
];

export const globalTypes: Record<string, ToolbarArgType> = {
  locale: {
    name: 'Locale',
    description: 'Change i18next locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: Object.keys(i18nResources).map(lng =>
        (i18nResources[lng].locale as { [_: string]: string }).name
          ? {
              value: lng,
              title: (i18nResources[lng].locale as { [_: string]: string })
                .name,
              right: lng
            }
          : {
              value: lng,
              title: lng
            }
      )
    }
  }
};

export const decorators: Meta['decorators'] = [
  (Story, context) => {
    const theme = useDarkMode() ? themes.dark : themes.light;
    const locale: string = context.globals.locale;
    useEffect(() => {
      i18next.changeLanguage(locale);
    }, [locale]);
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GamepadProvider>
          <Story />
        </GamepadProvider>
      </ThemeProvider>
    );
  }
];

export const parameters: Meta['parameters'] = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
