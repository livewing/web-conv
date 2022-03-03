export interface InputConfig {
  /** Xbox: A, PlayStation: Cross, Nintendo: B */
  a: GamepadButton | null;
  /** Xbox: B, PlayStation: Circle, Nintendo: A */
  b: GamepadButton | null;
  /** Xbox: X, PlayStation: Square, Nintendo: Y */
  x: GamepadButton | null;
  /** Xbox: Y, PlayStation: Triangle, Nintendo: X */
  y: GamepadButton | null;
  /** Xbox: LB, PlayStation: L1, Nintendo: L */
  lb: GamepadButton | null;
  /** Xbox: RB, PlayStation: R1, Nintendo: R */
  rb: GamepadButton | null;
  /** Xbox: LT, PlayStation: L2, Nintendo: ZL */
  lt: GamepadButton | null;
  /** Xbox: RT, PlayStation: R2, Nintendo: ZR */
  rt: GamepadButton | null;
  /** Xbox: Back / View, PlayStation: Select, Nintendo: Select / - */
  back: GamepadButton | null;
  /** Xbox: Start / Menu, PlayStation: Start, Nintendo: Start / + */
  start: GamepadButton | null;
  up: GamepadButton | null;
  down: GamepadButton | null;
  left: GamepadButton | null;
  right: GamepadButton | null;
}
export interface GamepadButton {
  index: number;
  button: number;
}

export const defaultConfig = (): InputConfig => ({
  a: { index: 0, button: 0 },
  b: { index: 0, button: 1 },
  x: { index: 0, button: 2 },
  y: { index: 0, button: 3 },
  lb: { index: 0, button: 4 },
  rb: { index: 0, button: 5 },
  lt: { index: 0, button: 6 },
  rt: { index: 0, button: 7 },
  back: { index: 0, button: 8 },
  start: { index: 0, button: 9 },
  up: { index: 0, button: 12 },
  down: { index: 0, button: 13 },
  left: { index: 0, button: 14 },
  right: { index: 0, button: 15 }
});

export const emptyConfig = (): InputConfig => ({
  a: null,
  b: null,
  x: null,
  y: null,
  lb: null,
  rb: null,
  lt: null,
  rt: null,
  back: null,
  start: null,
  up: null,
  down: null,
  left: null,
  right: null
});

export const buttonToInput = (
  config: InputConfig,
  button: GamepadButton
): (keyof InputConfig)[] =>
  (Object.keys(config) as (keyof InputConfig)[]).filter(
    k =>
      config[k]?.index === button.index && config[k]?.button === button.button
  );

export const gamepadsToInputs = (
  gamepads: (Gamepad | null)[],
  config: InputConfig
) =>
  gamepads
    .flatMap(g =>
      g !== null
        ? g.buttons.flatMap((b, i) =>
            b.pressed ? { index: g.index, button: i } : []
          )
        : []
    )
    .flatMap(b => buttonToInput(config, b))
    .reduce(
      (acc, cur) => ({ ...acc, [cur]: true }),
      {} as { [_ in keyof InputConfig]?: boolean }
    );
