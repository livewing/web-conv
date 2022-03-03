import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select as Component } from './Select';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/Select',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    index: 1
  };
  return c;
})(Template.bind({}));
