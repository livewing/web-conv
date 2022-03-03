import type { StorybookConfig } from '@storybook/core-common';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  core: { builder: 'webpack5' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    'storybook-dark-mode'
  ],
  webpackFinal: async config => {
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        typeof rule !== 'string' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test?.test('.svg')
    );
    if (typeof fileLoaderRule !== 'undefined')
      fileLoaderRule.exclude = /\.svg$/;

    config.module?.rules?.push(
      {
        test: /\.svg$/,
        enforce: 'pre',
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: {
                plugins: [{ removeViewBox: false }]
              }
            }
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      }
    );
    return config;
  }
};

export default config;
module.exports = config;
