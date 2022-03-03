import React, { type VFC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ConfigRow } from '../../ui/ConfigRow';
import { Segment } from '../../ui/Segment';
import type { NoteName } from '../../../lib/visualizer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
`;

interface NoteNameConfigPanelProps {
  config: NoteName;
  onChange?: (config: NoteName) => void;
}

export const NoteNameConfigPanel: VFC<NoteNameConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ConfigRow label={t('visualizer-config.show-octave')}>
        <Segment
          items={[t('visualizer-config.off'), t('visualizer-config.on')]}
          index={config.showOctave ? 1 : 0}
          onChange={v => onChange({ ...config, showOctave: v === 1 })}
        />
      </ConfigRow>
      <ConfigRow label={t('visualizer-config.show-button')}>
        <Segment
          items={[t('visualizer-config.off'), t('visualizer-config.on')]}
          index={config.showButton ? 1 : 0}
          onChange={v => onChange({ ...config, showButton: v === 1 })}
        />
      </ConfigRow>
    </Wrapper>
  );
};
