import React from 'react';
import { useArgs } from '@storybook/client-api';
import { defaultConfig } from '../../lib/map';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { MapConfigPanel as Component } from './MapConfigPanel';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'Panels/MapConfigPanel',
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
