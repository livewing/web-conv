import React from 'react';
import { useArgs } from '@storybook/client-api';
import { defaultConfig } from '../../lib/visualizer';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { VisualizerConfigPanel as Component } from './VisualizerConfigPanel';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'Panels/VisualizerConfigPanel',
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
  return c;
})(Template.bind({}));
