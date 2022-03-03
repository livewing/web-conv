import React, { type VFC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ConfigRow } from '../../ui/ConfigRow';
import { Select } from '../../ui/Select';
import type { Innocence } from '../../../lib/visualizer';

const shapes = ['random', 'line', 'square', 'triangle', 'circle'] as const;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
`;

interface InnocenceConfigPanelProps {
  config: Innocence;
  onChange?: (config: Innocence) => void;
}

export const InnocenceConfigPanel: VFC<InnocenceConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ConfigRow label={t('visualizer-config.shape')}>
        <Select
          items={shapes.map(s => t(`visualizer-config.${s}`))}
          index={shapes.indexOf(config.shape)}
          onChange={i => onChange({ ...config, shape: shapes[i] })}
        />
      </ConfigRow>
    </Wrapper>
  );
};
