import React from 'react';
import { useArgs } from '@storybook/client-api';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ValueEditor as Component } from './ValueEditor';

type Component = typeof Component;
type Meta = ComponentMeta<Component>;
type Story = ComponentStory<Component>;

export default {
  title: 'UI/ValueEditor',
  component: Component
} as Meta;

const Template: Story = args => {
  const [{ value }, updateArgs] = useArgs() as [
    typeof args,
    (newArgs: Partial<typeof args>) => void,
    unknown
  ];
  return (
    <Component
      {...args}
      value={value}
      onChange={value => updateArgs({ value })}
    />
  );
};

export const Default = (c => {
  c.args = {
    value: 0,
    minValue: 0,
    maxValue: 10,
    step: 1
  };
  return c;
})(Template.bind({}));

export const Custom = (c => {
  c.args = {
    children: n => `${n} px`,
    value: 0,
    minValue: 0,
    maxValue: 10,
    step: 1,
    parse: s => Number((s.match(/^\s*(\d+)\s*(px)?\s*$/) ?? [])[1])
  };
  return c;
})(Template.bind({}));
