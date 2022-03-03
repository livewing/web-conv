import React from 'react';
import { useArgs } from '@storybook/client-api';
import { common } from '../../styles/themes';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Segment as Component } from './Segment';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/Segment',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ index }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      index={index}
      onChange={index => updateArgs({ index })}
    />
  );
};

export const Default = (c => {
  c.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    index: 0,
    vertical: false,
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const Colored = (c => {
  c.args = {
    items: [
      'Gamepad',
      'Synth',
      {
        foreground: common.danger,
        node: 'Delete'
      }
    ],
    index: 2,
    vertical: false,
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const Vertical = (c => {
  c.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    index: 0,
    vertical: true,
    fullWidth: false
  };
  return c;
})(Template.bind({}));

export const FullWidth = (c => {
  c.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    index: 0,
    vertical: false,
    fullWidth: true
  };
  return c;
})(Template.bind({}));
