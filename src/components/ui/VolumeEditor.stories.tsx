import React from 'react';
import { useArgs } from '@storybook/client-api';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { VolumeEditor as Component } from './VolumeEditor';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/VolumeEditor',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ value }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      value={value}
      onChange={value => updateArgs({ value })}
    />
  );
};

export const Default = (c => {
  c.args = { value: 1 };
  return c;
})(Template.bind({}));
