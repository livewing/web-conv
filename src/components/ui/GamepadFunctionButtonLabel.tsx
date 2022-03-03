import React, { type VFC } from 'react';

const c = (b: boolean) => (b ? 'currentcolor' : void 0);

interface GamepadFunctionButtonLabelProps {
  lb?: boolean;
  rb?: boolean;
  lt?: boolean;
  rt?: boolean;
}
export const GamepadFunctionButtonLabel: VFC<
  GamepadFunctionButtonLabelProps
> = ({ lb = false, rb = false, lt = false, rt = false }) => (
  <svg
    version="1.1"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g stroke="gray" strokeWidth="2" fill="none">
      <rect
        x="3"
        y="20"
        width="10"
        height="6"
        rx="2"
        stroke={c(lb)}
        fill={c(lb)}
      />
      <rect
        x="5"
        y="6"
        width="6"
        height="10"
        rx="2"
        stroke={c(lt)}
        fill={c(lt)}
      />
      <rect
        x="19"
        y="20"
        width="10"
        height="6"
        rx="2"
        stroke={c(rb)}
        fill={c(rb)}
      />
      <rect
        x="21"
        y="6"
        width="6"
        height="10"
        rx="2"
        stroke={c(rt)}
        fill={c(rt)}
      />
    </g>
  </svg>
);
