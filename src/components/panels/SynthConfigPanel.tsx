import React, { type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ConfigRow } from '../ui/ConfigRow';
import { Select } from '../ui/Select';
import { ValueEditor } from '../ui/ValueEditor';
import { EnvelopeEditor } from '../ui/EnvelopeEditor';
import { VolumeEditor } from '../ui/VolumeEditor';
import {
  isFatOscillatorOption,
  isFatOscillatorOptionType,
  oscillatorTypes,
  type FatOscillatorOption,
  type SynthConfig
} from '../../lib/synth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;

interface SynthConfigPanelProps {
  config: SynthConfig;
  onChange?: (config: SynthConfig) => void;
}
export const SynthConfigPanel: VFC<SynthConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ConfigRow label={t('synth-config.source')}>
        <Select
          items={[t('synth-config.oscillator')]}
          index={['oscillator'].indexOf(config.source.type)}
          onChange={() =>
            onChange({
              ...config,
              source: {
                type: 'oscillator',
                option: {
                  type: 'sawtooth',
                  detune: 0,
                  volume: 1,
                  envelope: {
                    attack: 0,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                  }
                }
              }
            })
          }
        />
      </ConfigRow>
      {config.source.type === 'oscillator' && (
        <>
          <ConfigRow label={t('synth-config.waveform')}>
            <Select
              items={oscillatorTypes.map(v => t(`synth-config.${v}`))}
              index={oscillatorTypes.indexOf(config.source.option.type)}
              onChange={v => {
                const type = oscillatorTypes[v];
                onChange({
                  ...config,
                  source: {
                    ...config.source,
                    option: isFatOscillatorOptionType(type)
                      ? isFatOscillatorOption(config.source.option)
                        ? { ...config.source.option, type }
                        : {
                            ...config.source.option,
                            type,
                            spread: 30,
                            count: 3
                          }
                      : {
                          type,
                          detune: config.source.option.detune,
                          volume: config.source.option.volume,
                          envelope: config.source.option.envelope
                        }
                  }
                });
              }}
            />
          </ConfigRow>
          <ConfigRow label={t('synth-config.detune')}>
            <ValueEditor
              value={config.source.option.detune}
              minValue={-1200}
              maxValue={1200}
              step={1}
              onChange={detune =>
                onChange({
                  ...config,
                  source: {
                    ...config.source,
                    option: {
                      ...config.source.option,
                      detune: Math.round(detune)
                    }
                  }
                })
              }
            >
              {count => t('synth-config.cent', { count })}
            </ValueEditor>
          </ConfigRow>
          {isFatOscillatorOption(config.source.option) && (
            <>
              <ConfigRow label={t('synth-config.number-of-oscillators')}>
                <ValueEditor
                  value={config.source.option.count}
                  minValue={2}
                  maxValue={16}
                  step={1}
                  onChange={count =>
                    onChange({
                      ...config,
                      source: {
                        ...config.source,
                        option: {
                          ...(config.source.option as FatOscillatorOption),
                          count: Math.round(count)
                        }
                      }
                    })
                  }
                />
              </ConfigRow>
              <ConfigRow label={t('synth-config.spread')}>
                <ValueEditor
                  value={config.source.option.spread}
                  minValue={0}
                  maxValue={1200}
                  step={1}
                  onChange={spread =>
                    onChange({
                      ...config,
                      source: {
                        ...config.source,
                        option: {
                          ...(config.source.option as FatOscillatorOption),
                          spread: Math.round(spread)
                        }
                      }
                    })
                  }
                >
                  {count => t('synth-config.cent', { count })}
                </ValueEditor>
              </ConfigRow>
            </>
          )}
          <EnvelopeEditor
            envelope={config.source.option.envelope}
            onChange={envelope =>
              onChange({
                ...config,
                source: {
                  ...config.source,
                  option: {
                    ...config.source.option,
                    envelope
                  }
                }
              })
            }
          />
          <ConfigRow label={t('synth-config.volume')}>
            <VolumeEditor
              value={config.source.option.volume}
              onChange={volume =>
                onChange({
                  ...config,
                  source: {
                    ...config.source,
                    option: {
                      ...config.source.option,
                      volume
                    }
                  }
                })
              }
            />
          </ConfigRow>
        </>
      )}
    </Wrapper>
  );
};
