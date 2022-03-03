import React from 'react';
import { useArgs } from '@storybook/client-api';
import { defaultConfig } from '../../lib/track';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Track as Component } from './Track';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'Containers/Track',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ config }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      config={config}
      onChange={config => updateArgs({ config })}
    />
  );
};

export const Default = (c => {
  c.args = {
    config: defaultConfig()
  };
  c.parameters = {
    storyshots: { disable: true }
  };
  return c;
})(Template.bind({}));
