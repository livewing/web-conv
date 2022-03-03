import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as Component } from './Button';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/Button',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    children: 'Button',
    type: 'default',
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const Primary = (c => {
  c.args = {
    children: 'Button',
    type: 'primary',
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const Danger = (c => {
  c.args = {
    children: 'Button',
    type: 'danger',
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const FullWidth = (c => {
  c.args = {
    children: 'Button',
    type: 'default',
    fullWidth: true
  };
  return c;
})(Template.bind({}));
