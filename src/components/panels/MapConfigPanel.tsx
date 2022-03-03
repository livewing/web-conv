import React, { useState, type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MelodyConfigPanel } from './map/MelodyConfigPanel';
import { ChordConfigPanel } from './map/ChordConfigPanel';
import { ConfigRow } from '../ui/ConfigRow';
import { ConfigSectionBar } from '../ui/ConfigSectionBar';
import { Segment } from '../ui/Segment';
import { ValueEditor } from '../ui/ValueEditor';
import { GamepadButtonLabel } from '../ui/GamepadButtonLabel';
import { noteToStrings, parseNote } from '../../lib/note';
import type { MapConfig } from '../../lib/map';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Dim = styled.p`
  color: ${({ theme }) => theme.border.color};
  font-size: 80%;
`;

interface MapConfigPanelProps {
  config: MapConfig;
  onChange?: (config: MapConfig) => void;
}
export const MapConfigPanel: VFC<MapConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  const [editingPlayMode, setEditingPlayMode] = useState(0);
  return (
    <Wrapper>
      <ConfigRow label={t('map-config.key')}>
        <ValueEditor
          value={config.key}
          minValue={0}
          maxValue={127}
          step={1}
          parse={s => {
            const st = s.trim();
            return /^\d+$/.test(st) ? Number(st) : parseNote(st);
          }}
          onChange={v =>
            onChange({
              ...config,
              key: Math.round(v)
            })
          }
        >
          {n => (
            <Center>
              <div>{n}</div>
              <Dim>{noteToStrings(n).join(' · ')}</Dim>
            </Center>
          )}
        </ValueEditor>
      </ConfigRow>
      <ConfigRow label={t('map-config.shift-mode')}>
        {(['lb', 'rb', 'lt', 'rt'] as const).map(button => (
          <ConfigRow
            key={button}
            label={<GamepadButtonLabel button={button} />}
          >
            <Segment
              items={['♯', '♭', '8va', '8vb']}
              index={(f => {
                if (f.type === 'shift' && f.amount === 1) return 0;
                if (f.type === 'shift' && f.amount === -1) return 1;
                if (f.type === 'shift' && f.amount === 12) return 2;
                if (f.type === 'shift' && f.amount === -12) return 3;
                return -1;
              })(config.shiftMode[button])}
              onChange={v =>
                onChange({
                  ...config,
                  shiftMode: {
                    ...config.shiftMode,
                    [button]:
                      v === 0
                        ? { type: 'shift', amount: 1 }
                        : v === 1
                        ? { type: 'shift', amount: -1 }
                        : v === 2
                        ? { type: 'shift', amount: 12 }
                        : { type: 'shift', amount: -12 }
                  }
                })
              }
            />
          </ConfigRow>
        ))}
      </ConfigRow>
      <ConfigRow label={t('map-config.play-mode')}>
        <Segment
          items={[t('map-config.melody'), t('map-config.chord')]}
          index={config.playMode === 'melody' ? 0 : 1}
          onChange={v =>
            onChange({
              ...config,
              playMode: (['melody', 'chord'] as const)[v]
            })
          }
        />
      </ConfigRow>
      <ConfigSectionBar>
        <Segment
          items={[t('map-config.melody'), t('map-config.chord')]}
          index={editingPlayMode}
          onChange={setEditingPlayMode}
        />
      </ConfigSectionBar>
      {editingPlayMode === 0 && (
        <MelodyConfigPanel
          config={config.melody}
          onChange={melody => onChange({ ...config, melody })}
        />
      )}
      {editingPlayMode === 1 && (
        <ChordConfigPanel
          config={config.chord}
          onChange={chord => onChange({ ...config, chord })}
        />
      )}
    </Wrapper>
  );
};
