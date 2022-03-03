import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { GamepadButtonLabel as Component } from './GamepadButtonLabel';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/GamepadButtonLabel',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    button: 'a'
  };
  c.parameters = {
    storyshots: { disable: true }
  };
  return c;
})(Template.bind({}));
