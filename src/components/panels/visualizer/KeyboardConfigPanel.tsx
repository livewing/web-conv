import React, { type VFC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ConfigRow } from '../../ui/ConfigRow';
import { Segment } from '../../ui/Segment';
import { ValueEditor } from '../../ui/ValueEditor';
import type { Keyboard } from '../../../lib/visualizer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
`;

interface KeyboardConfigPanelProps {
  config: Keyboard;
  onChange?: (config: Keyboard) => void;
}

export const KeyboardConfigPanel: VFC<KeyboardConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ConfigRow label={t('visualizer-config.pitch')}>
        <Segment
          items={[
            t('visualizer-config.absolute'),
            t('visualizer-config.relative')
          ]}
          index={config.pitch === 'absolute' ? 0 : 1}
          onChange={v =>
            onChange({ ...config, pitch: v === 0 ? 'absolute' : 'relative' })
          }
        />
      </ConfigRow>
      <ConfigRow label={t('visualizer-config.range')}>
        <ValueEditor
          value={config.range}
          minValue={1}
          maxValue={4}
          step={1}
          onChange={v => onChange({ ...config, range: Math.round(v) })}
        >
          {count => t('visualizer-config.octave', { count })}
        </ValueEditor>
      </ConfigRow>
      <ConfigRow label={t('visualizer-config.highlight-standby')}>
        <Segment
          items={[t('visualizer-config.off'), t('visualizer-config.on')]}
          index={config.highlightStandby ? 1 : 0}
          onChange={v => onChange({ ...config, highlightStandby: v === 1 })}
        />
      </ConfigRow>
    </Wrapper>
  );
};
