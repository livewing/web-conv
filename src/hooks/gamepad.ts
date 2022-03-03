import { useEffect, useState } from 'react';
import { usePrevious } from './util';
import type { GamepadButton } from '../lib/input';

export const getGamepadsSnapshot = (): (Gamepad | null)[] =>
  [...navigator.getGamepads()].map(gamepad =>
    gamepad === null
      ? null
      : {
          ...gamepad,
          axes: [...gamepad.axes],
          buttons: [
            ...gamepad.buttons.map(button => ({
              ...button,
              pressed: button.pressed,
              touched: button.touched,
              value: button.value
            }))
          ],
          connected: gamepad.connected,
          id: gamepad.id,
          index: gamepad.index,
          mapping: gamepad.mapping,
          timestamp: gamepad.timestamp
        }
  );

const gamepadsTimestamp = (gamepads: (Gamepad | null)[]) =>
  gamepads.reduce((acc, cur) => Math.max(acc, cur?.timestamp ?? -1), -1);

export const useGamepadsImpl = (interval = 1000 / 60): (Gamepad | null)[] => {
  const [state, setState] = useState(getGamepadsSnapshot());
  const [prevTimestamp, setPrevTimestamp] = useState(gamepadsTimestamp(state));
  useEffect(() => {
    const timer = setInterval(() => {
      const gamepads = getGamepadsSnapshot();
      const timestamp = gamepadsTimestamp(gamepads);
      if (prevTimestamp !== timestamp) {
        setPrevTimestamp(timestamp);
        setState(gamepads);
      }
    }, interval);
    return () => clearInterval(timer);
  });
  return state;
};

export interface GamepadButtonEvent {
  button: GamepadButton;
  action: 'down' | 'up';
}
export const useGamepadButtonEvent = (
  gamepads: (Gamepad | null)[],
  cb: (events: GamepadButtonEvent[]) => void
) => {
  const prevGamepads =
    usePrevious(gamepads) ?? [...Array(gamepads.length)].map(() => null);
  useEffect(() => {
    const events: GamepadButtonEvent[] = [];
    for (let i = 0; i < gamepads.length; i++) {
      const prev = prevGamepads[i] ?? null;
      const current = gamepads[i] ?? null;
      if (prev !== null && current !== null) {
        for (let j = 0; j < current.buttons.length; j++) {
          if (
            typeof prev.buttons[j] !== 'undefined' &&
            prev.buttons[j].pressed !== current.buttons[j].pressed
          ) {
            events.push({
              button: { index: i, button: j },
              action: current.buttons[j].pressed ? 'down' : 'up'
            });
          }
        }
      } else if (prev !== null || current !== null) {
        const some = (prev ?? current) as Gamepad;
        some.buttons.forEach((button, j) => {
          if (button.pressed) {
            events.push({
              button: { index: i, button: j },
              action: prev === null ? 'down' : 'up'
            });
          }
        });
      }
    }
    if (events.length > 0) cb(events);
  });
};
