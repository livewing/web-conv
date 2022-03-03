import React, { type VFC } from 'react';
import A from '../../images/buttons/a.svg';
import B from '../../images/buttons/b.svg';
import X from '../../images/buttons/x.svg';
import Y from '../../images/buttons/y.svg';
import LB from '../../images/buttons/lb.svg';
import RB from '../../images/buttons/rb.svg';
import LT from '../../images/buttons/lt.svg';
import RT from '../../images/buttons/rt.svg';
import Back from '../../images/buttons/back.svg';
import Start from '../../images/buttons/start.svg';
import Up from '../../images/buttons/up.svg';
import Down from '../../images/buttons/down.svg';
import Left from '../../images/buttons/left.svg';
import Right from '../../images/buttons/right.svg';
import type { InputConfig } from '../../lib/input';

const buttonLabels: { [_ in keyof InputConfig]: React.ReactNode } = {
  a: <A />,
  b: <B />,
  x: <X />,
  y: <Y />,
  lb: <LB />,
  rb: <RB />,
  lt: <LT />,
  rt: <RT />,
  back: <Back />,
  start: <Start />,
  up: <Up />,
  down: <Down />,
  left: <Left />,
  right: <Right />
};

interface GamepadButtonLabelProps {
  button: keyof InputConfig;
}
export const GamepadButtonLabel: VFC<GamepadButtonLabelProps> = ({
  button
}) => <>{buttonLabels[button]}</>;
