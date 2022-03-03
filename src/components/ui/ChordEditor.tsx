import React, { type VFC } from 'react';
import styled from 'styled-components';
import { Add, DeleteForever } from '@styled-icons/material';
import { Select } from './Select';
import { Button } from './Button';
import { chordTypes, type Chord } from '../../lib/chord';

const degrees = [
  'I',
  '♯I · ♭II',
  'II',
  '♯II · ♭III',
  'III',
  'IV',
  '♯IV · ♭V',
  'V',
  '♯V · ♭VI',
  'VI',
  '♯VI · ♭VII',
  'VII'
] as const;
const shifts = [24, 12, 0, -12, -24];
const shiftLabels = ['15ma', '8va', '-', '8vb', '15mb'];

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;
const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
  justify-content: center;
`;

interface ChordEditorProps {
  chord?: Chord | null;
  onChange?: (chord: Chord | null) => void;
}
export const ChordEditor: VFC<ChordEditorProps> = ({
  chord = null,
  onChange = () => void 0
}) => (
  <Wrapper>
    {chord !== null && (
      <Column>
        <Row>
          <Select
            items={[...degrees]}
            index={chord.root}
            onChange={root =>
              onChange(
                chord.root === chord.bass
                  ? { ...chord, root, bass: root }
                  : { ...chord, root }
              )
            }
          />
          <Select
            items={[...chordTypes]}
            index={chordTypes.indexOf(chord.type)}
            onChange={v => onChange({ ...chord, type: chordTypes[v] })}
          />
          <Select
            items={shiftLabels}
            index={shifts.indexOf(chord.shift)}
            onChange={v => onChange({ ...chord, shift: shifts[v] })}
          />
        </Row>
        <Row>
          <Select
            items={['♯9', '9', '♭9', '-']}
            index={['sharp', 'natural', 'flat', null].indexOf(chord.ninth)}
            onChange={v =>
              onChange({
                ...chord,
                ninth: (['sharp', 'natural', 'flat', null] as const)[v]
              })
            }
          />
          <Select
            items={['♯11', '11', '-']}
            index={['sharp', 'natural', null].indexOf(chord.eleventh)}
            onChange={v =>
              onChange({
                ...chord,
                eleventh: (['sharp', 'natural', null] as const)[v]
              })
            }
          />
          <Select
            items={['13', '♭13', '-']}
            index={['natural', 'flat', null].indexOf(chord.thirteenth)}
            onChange={v =>
              onChange({
                ...chord,
                thirteenth: (['natural', 'flat', null] as const)[v]
              })
            }
          />
          <Select
            items={[...degrees.map(d => `/${d}`), '-']}
            index={chord.bass === null ? degrees.length : chord.bass}
            onChange={v =>
              onChange({ ...chord, bass: v === degrees.length ? null : v })
            }
          />
        </Row>
      </Column>
    )}
    {chord === null && (
      <Button
        type="primary"
        onClick={() =>
          onChange({
            root: 0,
            bass: 0,
            type: 'maj',
            shift: 0,
            ninth: null,
            eleventh: null,
            thirteenth: null
          })
        }
      >
        <Add size={24} />
      </Button>
    )}
    {chord !== null && (
      <Button type="danger" onClick={() => onChange(null)}>
        <DeleteForever size={24} />
      </Button>
    )}
  </Wrapper>
);
