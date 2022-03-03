import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { App as Component } from './App';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'App/App',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {};
  c.parameters = {
    storyshots: { disable: true }
  };
  return c;
})(Template.bind({}));
