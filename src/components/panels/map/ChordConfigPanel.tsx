import React, { useState, type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ConfigRow } from '../../ui/ConfigRow';
import { Segment } from '../../ui/Segment';
import { ChordEditor } from '../../ui/ChordEditor';
import { GamepadButtonLabel } from '../../ui/GamepadButtonLabel';
import { GamepadFunctionButtonLabel } from '../../ui/GamepadFunctionButtonLabel';
import { chordSetMap } from '../../../lib/chord';
import type { MapConfig } from '../../../lib/map';

const setButtons: MapConfig['chord']['currentSet'][] = [
  'down',
  'left',
  'up',
  'right',
  'x',
  'y',
  'b',
  'a'
];

const ChordSetContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
  margin-top: ${({ theme }) => theme.space(2)};
  align-items: flex-start;
`;

const ChordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.space(3)};
`;

const ButtonLabelContainer = styled.div`
  display: flex;
`;

interface ChordConfigPanelProps {
  config: MapConfig['chord'];
  onChange?: (config: MapConfig['chord']) => void;
}
export const ChordConfigPanel: VFC<ChordConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  const [editingChords, setEditingChords] = useState(0);
  return (
    <>
      <ConfigRow label={t('map-config.chord-set')}>
        <Segment
          items={setButtons.map(b => (
            <GamepadButtonLabel key={b} button={b} />
          ))}
          index={setButtons.indexOf(config.currentSet)}
          onChange={v =>
            onChange({
              ...config,
              currentSet: setButtons[v]
            })
          }
        />
      </ConfigRow>
      <ChordSetContainer>
        <Segment
          items={[...Array(16)].map((_, i) => (
            <GamepadFunctionButtonLabel key={i} {...chordSetMap[i]} />
          ))}
          index={editingChords}
          vertical
          onChange={setEditingChords}
        />
        <ChordsContainer>
          {(['down', 'left', 'up', 'right', 'x', 'y', 'b', 'a'] as const).map(
            b => (
              <ConfigRow
                key={b}
                label={
                  <ButtonLabelContainer>
                    <GamepadFunctionButtonLabel
                      {...chordSetMap[editingChords]}
                    />
                    <GamepadButtonLabel button={b} />
                  </ButtonLabelContainer>
                }
              >
                <ChordEditor
                  chord={config.chords[config.currentSet][editingChords][b]}
                  onChange={v =>
                    onChange({
                      ...config,
                      chords: {
                        ...config.chords,
                        [config.currentSet]: {
                          ...config.chords[config.currentSet],
                          [editingChords]: {
                            ...config.chords[config.currentSet][editingChords],
                            [b]: v
                          }
                        }
                      }
                    })
                  }
                />
              </ConfigRow>
            )
          )}
        </ChordsContainer>
      </ChordSetContainer>
    </>
  );
};
