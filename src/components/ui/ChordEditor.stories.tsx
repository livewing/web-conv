import React from 'react';
import { useArgs } from '@storybook/client-api';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChordEditor as Component } from './ChordEditor';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/ChordEditor',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ chord }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      chord={chord}
      onChange={chord => updateArgs({ chord })}
    />
  );
};

export const Default = (c => {
  c.args = {
    chord: null
  };
  return c;
})(Template.bind({}));
