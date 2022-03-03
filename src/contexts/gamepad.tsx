import React, { createContext, useContext, type VFC } from 'react';
import {
  getGamepadsSnapshot,
  useGamepadButtonEvent,
  useGamepadsImpl,
  type GamepadButtonEvent
} from '../hooks/gamepad';

export const GamepadsContext = createContext<(Gamepad | null)[]>(
  getGamepadsSnapshot()
);

interface GamepadProviderProps {
  children?: React.ReactNode;
}
export const GamepadProvider: VFC<GamepadProviderProps> = ({ children }) => {
  const gamepads = useGamepadsImpl();
  return (
    <GamepadsContext.Provider value={gamepads}>
      {children}
    </GamepadsContext.Provider>
  );
};

export const useGamepads = (
  cb: (events: GamepadButtonEvent[]) => void = () => void 0
) => {
  const gamepads = useContext(GamepadsContext);
  useGamepadButtonEvent(gamepads, cb);
  return gamepads;
};
