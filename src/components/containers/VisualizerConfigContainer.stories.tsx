import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { VisualizerConfigContainer as Component } from './VisualizerConfigContainer';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'Containers/VisualizerConfigContainer',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    title: 'Title',
    children: 'Hello'
  };
  return c;
})(Template.bind({}));

export const NoContent = (c => {
  c.args = {
    title: 'Title'
  };
  return c;
})(Template.bind({}));
