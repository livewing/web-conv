import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfigSectionBar as Component } from './ConfigSectionBar';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/ConfigSectionBar',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {};
  return c;
})(Template.bind({}));

export const WithTitle = (c => {
  c.args = {
    children: 'Title'
  };
  return c;
})(Template.bind({}));
