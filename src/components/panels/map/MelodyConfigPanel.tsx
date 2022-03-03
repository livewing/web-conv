import React, { type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ConfigRow } from '../../ui/ConfigRow';
import { Segment } from '../../ui/Segment';
import { GamepadButtonLabel } from '../../ui/GamepadButtonLabel';
import { Select } from '../../ui/Select';
import { romans } from '../../../lib/note';
import { layouts, scaleList, type MapConfig } from '../../../lib/map';
import LayoutAnaconMIDIConv from '../../../images/layout-anacon-midi-conv.svg';
import LayoutBandBrothers from '../../../images/layout-band-brothers.svg';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SegmentItemLabel = styled.p`
  font-size: 80%;
  text-align: center;
`;

interface MelodyConfigPanelProps {
  config: MapConfig['melody'];
  onChange?: (config: MapConfig['melody']) => void;
}
export const MelodyConfigPanel: VFC<MelodyConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ConfigRow label={t('map-config.layout')}>
        <Segment
          items={[
            <Center key={0}>
              <LayoutAnaconMIDIConv />
              <SegmentItemLabel>
                {t('map-config.anacon-midi-conv')}
              </SegmentItemLabel>
            </Center>,
            <Center key={1}>
              <LayoutBandBrothers />
              <SegmentItemLabel>
                {t('map-config.band-brothers')}
              </SegmentItemLabel>
            </Center>
          ]}
          index={config.layout === 'anacon-midi-conv' ? 0 : 1}
          onChange={v =>
            onChange({
              ...config,
              layout: v === 0 ? 'anacon-midi-conv' : 'band-brothers'
            })
          }
        />
      </ConfigRow>
      <ConfigRow label={t('map-config.key-button')}>
        <Segment
          items={layouts[config.layout].map((b, i) => (
            <Center key={b}>
              <GamepadButtonLabel button={b} />
              <SegmentItemLabel>
                {romans[(7 + i - config.keyButton) % 7]}
              </SegmentItemLabel>
            </Center>
          ))}
          index={config.keyButton}
          onChange={v =>
            onChange({
              ...config,
              keyButton: v as typeof config.keyButton
            })
          }
        />
      </ConfigRow>
      <ConfigRow label={t('scale.title')}>
        <Select
          items={scaleList.map(s => t(`scale.${s}`))}
          index={scaleList.indexOf(config.scale)}
          onChange={i =>
            onChange({
              ...config,
              scale: scaleList[i]
            })
          }
        />
      </ConfigRow>
      <ConfigRow label={t('map-config.functions')}>
        {(['lb', 'rb', 'lt', 'rt'] as const).map(button => (
          <ConfigRow
            key={button}
            label={<GamepadButtonLabel button={button} />}
          >
            <Segment
              items={['♯', '♭', '8va', '8vb', 'Ped.']}
              index={(f => {
                if (f.type === 'shift' && f.amount === 1) return 0;
                if (f.type === 'shift' && f.amount === -1) return 1;
                if (f.type === 'shift' && f.amount === 12) return 2;
                if (f.type === 'shift' && f.amount === -12) return 3;
                if (f.type === 'sustain') return 4;
                return -1;
              })(config.functions[button])}
              onChange={v =>
                onChange({
                  ...config,
                  functions: {
                    ...config.functions,
                    [button]:
                      v === 0
                        ? { type: 'shift', amount: 1 }
                        : v === 1
                        ? { type: 'shift', amount: -1 }
                        : v === 2
                        ? { type: 'shift', amount: 12 }
                        : v === 3
                        ? { type: 'shift', amount: -12 }
                        : { type: 'sustain' }
                  }
                })
              }
            />
          </ConfigRow>
        ))}
      </ConfigRow>
    </>
  );
};
