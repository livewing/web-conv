import React from 'react';
import { useArgs } from '@storybook/client-api';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { GamepadButtonAssign as Component } from './GamepadButtonAssign';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/GamepadButtonAssign',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ button, ready }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      button={button}
      onChange={button => updateArgs({ button, ready: false })}
      onClick={() => updateArgs({ ready: !ready })}
    />
  );
};

export const Default = (c => {
  c.args = {
    button: null,
    ready: false,
    warn: false
  };
  return c;
})(Template.bind({}));
