import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer as Component } from './Footer';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'Sections/Footer',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {};
  return c;
})(Template.bind({}));
