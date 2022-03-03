import React from 'react';
import { useArgs } from '@storybook/client-api';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { EnvelopeEditor as Component } from './EnvelopeEditor';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/EnvelopeEditor',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ envelope }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      envelope={envelope}
      onChange={envelope => updateArgs({ envelope })}
    />
  );
};

export const Default = (c => {
  c.args = {
    envelope: {
      attack: 0,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  };
  return c;
})(Template.bind({}));
