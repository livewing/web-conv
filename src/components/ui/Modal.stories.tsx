import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal as Component } from './Modal';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/Modal',
  component: Component,
  parameters: { layout: 'fullscreen' }
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    isOpen: true,
    children: <p>Hello</p>
  };
  return c;
})(Template.bind({}));
