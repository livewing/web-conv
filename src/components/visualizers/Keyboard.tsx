import React, { type VFC } from 'react';
import styled from 'styled-components';
import {
  buttonToMidiNote,
  layouts,
  type MapConfig,
  type Modifier
} from '../../lib/map';
import { chordSetMapIndex, chordToTones, type Chord } from '../../lib/chord';
import type { Keyboard as KeyboardConfig } from '../../lib/visualizer';
import type { Pressing } from '../../hooks/synth';

const OctaveWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.border.color};
  aspect-ratio: 5 / 3;
`;
const LowerGroup = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
`;
const UpperGroup = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  height: 60%;
  grid-template-columns: 3fr 4fr;
`;
const UpperGroupLeft = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
`;
const UpperGroupRight = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
`;
const WhiteKey = styled.div<{ standby: boolean; active: boolean }>`
  background: ${({ standby, active, theme }) =>
    active ? theme.danger : standby ? 'lime' : 'white'};
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: 0 0 2px 2px;
`;
const NoneKey = styled.div`
  background: transparent;
`;
const BlackKey = styled.div<{ standby: boolean; active: boolean }>`
  background: ${({ standby, active, theme }) =>
    active ? theme.danger : standby ? 'lime' : 'black'};
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: 0 0 2px 2px;
`;

interface OctaveProps {
  standby?: number[];
  active?: number[];
}
const Octave: VFC<OctaveProps> = ({ standby = [], active = [] }) => {
  const r = [...Array(12)].map(() => false);
  standby.forEach(n => {
    if (n >= 0 && n <= 11) r[n] = true;
  });
  const a = [...Array(12)].map(() => false);
  active.forEach(n => {
    if (n >= 0 && n <= 11) a[n] = true;
  });
  return (
    <OctaveWrapper>
      <LowerGroup>
        <WhiteKey standby={r[0]} active={a[0]} />
        <WhiteKey standby={r[2]} active={a[2]} />
        <WhiteKey standby={r[4]} active={a[4]} />
        <WhiteKey standby={r[5]} active={a[5]} />
        <WhiteKey standby={r[7]} active={a[7]} />
        <WhiteKey standby={r[9]} active={a[9]} />
        <WhiteKey standby={r[11]} active={a[11]} />
      </LowerGroup>
      <UpperGroup>
        <UpperGroupLeft>
          <NoneKey />
          <BlackKey standby={r[1]} active={a[1]} />
          <NoneKey />
          <BlackKey standby={r[3]} active={a[3]} />
          <NoneKey />
        </UpperGroupLeft>
        <UpperGroupRight>
          <NoneKey />
          <BlackKey standby={r[6]} active={a[6]} />
          <NoneKey />
          <BlackKey standby={r[8]} active={a[8]} />
          <NoneKey />
          <BlackKey standby={r[10]} active={a[10]} />
          <NoneKey />
        </UpperGroupRight>
      </UpperGroup>
    </OctaveWrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  visibility: hidden;
`;

const shiftToCssValue = (shift: number) => {
  switch (shift) {
    case 1:
      return '3 / 7 * 1 / 5';
    case 2:
      return '1 / 7';
    case 3:
      return '3 / 7 * 3 / 5';
    case 4:
      return '2 / 7';
    case 5:
      return '3 / 7';
    case 6:
      return '(3 / 7) + (1 / 7 * 3 / 5)';
    case 7:
      return '4 / 7';
    case 8:
      return '(3 / 7) + (3 / 7 * 3 / 5)';
    case 9:
      return '5 / 7';
    case 10:
      return '(3 / 7) + (5 / 7 * 3 / 5)';
    case 11:
      return '6 / 7';
    case 12:
      return '1';
    default:
      return '0';
  }
};

const Content = styled.div<{ count: number; shift: number }>`
  display: grid;
  grid-auto-flow: column;
  position: absolute;
  left: calc(
    100% * (-1 / ${({ count }) => count}) *
      (${({ shift }) => shiftToCssValue(shift)})
  );
  top: 0;
  height: 100%;
  width: calc(100% * (${({ count }) => count + 1} / ${({ count }) => count}));
`;

interface KeyboardProps {
  mapConfig: MapConfig;
  visualizerConfig: KeyboardConfig;
  pressing: Pressing[];
  shiftMode: boolean;
  functionButtons: { lb: boolean; rb: boolean; lt: boolean; rt: boolean };
}

export const Keyboard: VFC<KeyboardProps> = ({
  mapConfig,
  visualizerConfig,
  pressing,
  shiftMode,
  functionButtons
}) => {
  const { key, playMode } = mapConfig;
  const size = visualizerConfig.range * 2 + 1;
  const isRelative = visualizerConfig.pitch === 'relative';
  const shift = shiftMode
    ? 0
    : (
        Object.entries(mapConfig.melody.functions) as [
          keyof typeof mapConfig.melody.functions,
          Modifier
        ][]
      ).reduce(
        (acc, [k, v]) =>
          acc + (functionButtons[k] && v.type === 'shift' ? v.amount : 0),
        0
      );
  const first =
    (playMode === 'melody'
      ? (buttonToMidiNote(mapConfig, 'down') as number)
      : key) -
    Math.floor(key / 12) * 12 -
    (isRelative ? key % 12 : 0);
  const positionShift = -Math.floor(first / 12) * 12;
  const noteToKeyPosition = (note: number) =>
    note -
    Math.floor(key / 12) * 12 -
    (isRelative ? key % 12 : 0) +
    positionShift;
  const notes = pressing.map(p => noteToKeyPosition(p.note));
  const standby = visualizerConfig.highlightStandby
    ? playMode === 'melody'
      ? layouts[mapConfig.melody.layout].flatMap(b => {
          const n = buttonToMidiNote(mapConfig, b);
          return typeof n === 'undefined' ? [] : [noteToKeyPosition(n + shift)];
        })
      : (() => {
          const chords =
            mapConfig.chord.chords[mapConfig.chord.currentSet][
              shiftMode ? 0 : chordSetMapIndex(functionButtons)
            ];
          return (
            ['down', 'left', 'up', 'right', 'x', 'y', 'b', 'a'] as const
          ).flatMap(b =>
            chords[b] !== null ? chordToTones(chords[b] as Chord) : []
          );
        })().map(n => n + (isRelative ? 0 : key % 12))
    : [];
  return (
    <Wrapper>
      <Layout>
        {[...Array(size)].map((_, i) => (
          <OctaveWrapper key={i} />
        ))}
      </Layout>
      <Content count={size} shift={first + positionShift}>
        {[...Array(size + 1)].map((_, i) => (
          <Octave
            key={i}
            standby={standby.map(
              n => n - (i - visualizerConfig.range - 0) * 12
            )}
            active={notes.map(n => n - (i - visualizerConfig.range - 0) * 12)}
          />
        ))}
      </Content>
    </Wrapper>
  );
};
