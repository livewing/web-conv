import React, { type VFC } from 'react';
import styled from 'styled-components';
import { GamepadButtonLabel } from '../ui/GamepadButtonLabel';
import {
  chordSetMapIndex,
  chordToStrings,
  type Chord,
  type Chords
} from '../../lib/chord';
import { noteToStrings } from '../../lib/note';
import {
  buttonToMidiNote,
  layouts,
  type Modifier,
  type MapConfig
} from '../../lib/map';
import type { InputConfig } from '../../lib/input';
import type { NoteName as NoteNameConfig } from '../../lib/visualizer';
import type { SynthConfig } from '../../lib/synth';
import type { Pressing } from '../../hooks/synth';

const Wrapper = styled.div`
  display: flex;
`;
const ElementContainer = styled.div<{
  active?: boolean;
  isKeyButton?: boolean;
  attack: number;
  release: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom-width: ${({ active }) => (active ? '2px' : '0')};
  border-bottom-style: solid;
  border-bottom-color: ${({ theme, active }) =>
    active ? theme.color : theme.background};
  padding-top: ${({ theme }) => theme.space()};
  padding-bottom: ${({ theme, active }) =>
    active ? `calc(${theme.space()} - 2px)` : theme.space()};
  background: ${({ theme, active }) =>
    active ? theme.primary : theme.background};
  color: ${({ theme, active }) => (active ? 'white' : theme.color)};
  height: 6rem;
  font-weight: ${({ isKeyButton }) => (isKeyButton ? 'bold' : 'normal')};
  transition-property: color, background-color;
  transition-duration: ${({ active, attack, release }) =>
    active ? attack : release}s;
  overflow: hidden;
  white-space: nowrap;
`;
const ElementText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Element: VFC<{
  texts?: string[];
  icon?: keyof InputConfig;
  active?: boolean;
  isKeyButton?: boolean;
  attack?: number;
  release?: number;
}> = ({
  texts = [],
  icon,
  active = false,
  isKeyButton = false,
  attack = 0,
  release = 0
}) => (
  <ElementContainer
    active={active}
    isKeyButton={isKeyButton}
    attack={attack}
    release={release}
  >
    <ElementText>
      {texts.map(t => (
        <p key={t}>{t}</p>
      ))}
    </ElementText>
    {typeof icon !== 'undefined' && <GamepadButtonLabel button={icon} />}
  </ElementContainer>
);

interface NoteNameProps {
  mapConfig: MapConfig;
  synthConfig: SynthConfig;
  visualizerConfig: NoteNameConfig;
  pressing: Pressing[];
  shiftMode: boolean;
  functionButtons: { lb: boolean; rb: boolean; lt: boolean; rt: boolean };
}

export const NoteName: VFC<NoteNameProps> = ({
  mapConfig,
  synthConfig,
  visualizerConfig,
  pressing,
  shiftMode,
  functionButtons
}) => {
  const chords =
    mapConfig.chord.chords[mapConfig.chord.currentSet][
      chordSetMapIndex(
        shiftMode
          ? {
              lb: false,
              rb: false,
              lt: false,
              rt: false
            }
          : functionButtons
      )
    ];

  return (
    <Wrapper>
      {mapConfig.playMode === 'melody' &&
        layouts[mapConfig.melody.layout].map((button, i) => {
          const m = buttonToMidiNote(mapConfig, button);
          const shift = shiftMode
            ? 0
            : (
                Object.entries(mapConfig.melody.functions) as [
                  keyof typeof mapConfig.melody.functions,
                  Modifier
                ][]
              ).reduce(
                (acc, [k, v]) =>
                  acc +
                  (functionButtons[k] && v.type === 'shift' ? v.amount : 0),
                0
              );
          const p = pressing.filter(p => p.button === button);
          const isKeyButton = mapConfig.melody.keyButton === i;
          if (p.length > 0)
            return (
              <Element
                key={i}
                texts={noteToStrings(p[0].note, visualizerConfig.showOctave)}
                icon={visualizerConfig.showButton ? button : void 0}
                active
                isKeyButton={isKeyButton}
                attack={synthConfig.source.option.envelope.attack}
                release={synthConfig.source.option.envelope.release}
              />
            );
          else
            return (
              <Element
                key={i}
                texts={
                  typeof m !== 'undefined' && m + shift >= 0 && m + shift <= 127
                    ? noteToStrings(m + shift, visualizerConfig.showOctave)
                    : []
                }
                icon={visualizerConfig.showButton ? button : void 0}
                isKeyButton={isKeyButton}
                attack={synthConfig.source.option.envelope.attack}
                release={synthConfig.source.option.envelope.release}
              />
            );
        })}
      {mapConfig.playMode === 'chord' &&
        layouts['anacon-midi-conv'].map((button, i) => {
          const chord = chords[button as keyof Chords];
          const p: Pressing | undefined = pressing.filter(
            p => p.button === button && typeof p.chord !== 'undefined'
          )[0];
          if (typeof p !== 'undefined')
            return (
              <Element
                key={i}
                texts={chordToStrings(p.chord as Chord, mapConfig.key)}
                icon={visualizerConfig.showButton ? button : void 0}
                active
                attack={synthConfig.source.option.envelope.attack}
                release={synthConfig.source.option.envelope.release}
              />
            );
          else
            return (
              <Element
                key={i}
                texts={
                  chord !== null ? chordToStrings(chord, mapConfig.key) : []
                }
                icon={visualizerConfig.showButton ? button : void 0}
                attack={synthConfig.source.option.envelope.attack}
                release={synthConfig.source.option.envelope.release}
              />
            );
        })}
    </Wrapper>
  );
};
