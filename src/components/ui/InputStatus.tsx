import React, { type VFC } from 'react';
import { common } from '../../styles/themes';
import { useGamepads } from '../../contexts/gamepad';
import { gamepadsToInputs, type InputConfig } from '../../lib/input';

const fill = (on?: boolean) => (on ?? false ? common.danger : '#80808080');

interface InputStatusProps {
  inputConfig: InputConfig;
}
export const InputStatus: VFC<InputStatusProps> = ({ inputConfig }) => {
  const press = gamepadsToInputs(useGamepads(), inputConfig);
  return (
    <svg
      version="1.1"
      width="72"
      height="24"
      viewBox="0 0 72 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="23" y="3" width="4" height="7" fill={fill(press.up)} />
      <rect x="23" y="14" width="4" height="7" fill={fill(press.down)} />
      <rect x="16" y="10" width="7" height="4" fill={fill(press.left)} />
      <rect x="27" y="10" width="7" height="4" fill={fill(press.right)} />
      <circle cx="47" cy="18" r="3" fill={fill(press.a)} />
      <circle cx="53" cy="12" r="3" fill={fill(press.b)} />
      <circle cx="41" cy="12" r="3" fill={fill(press.x)} />
      <circle cx="47" cy="6" r="3" fill={fill(press.y)} />
      <rect x="2" y="18" width="12" height="4" rx="1" fill={fill(press.lb)} />
      <rect x="58" y="18" width="12" height="4" rx="1" fill={fill(press.rb)} />
      <rect x="6" y="6" width="4" height="10" rx="1" fill={fill(press.lt)} />
      <rect x="62" y="6" width="4" height="10" rx="1" fill={fill(press.rt)} />
      <path d="M20 2v6l-8 -3z" fill={fill(press.back)} />
      <path d="M52 2v6l8 -3z" fill={fill(press.start)} />
    </svg>
  );
};
