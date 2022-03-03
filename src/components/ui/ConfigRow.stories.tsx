import React from 'react';
import { Button } from './Button';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfigRow as Component } from './ConfigRow';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/ConfigRow',
  component: Component
} as Meta;

const Template: Story = args => <Component {...args} />;

export const Default = (c => {
  c.args = {
    label: 'Left',
    children: <Button>Right</Button>
  };
  return c;
})(Template.bind({}));
