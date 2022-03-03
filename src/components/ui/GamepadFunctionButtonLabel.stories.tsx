import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { GamepadFunctionButtonLabel as Component } from './GamepadFunctionButtonLabel';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/GamepadFunctionButtonLabel',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = { lb: false, rb: false, lt: false, rt: false };
  c.parameters = {
    storyshots: { disable: true }
  };
  return c;
})(Template.bind({}));
