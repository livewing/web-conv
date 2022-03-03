import React, { type VFC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Add } from '@styled-icons/material';
import { VisualizerConfigContainer } from '../containers/VisualizerConfigContainer';
import { Button } from '../ui/Button';
import {
  defaultVisualizerConfig,
  visualizerTypes,
  type Visualizer,
  type VisualizerConfig
} from '../../lib/visualizer';
import { NoteNameConfigPanel } from './visualizer/NoteNameConfigPanel';
import { KeyboardConfigPanel } from './visualizer/KeyboardConfigPanel';
import { InnocenceConfigPanel } from './visualizer/InnocenceConfigPanel';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;

const AddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space()};
`;

const VisualizerAdd: VFC<{ onAdd: (t: Visualizer['type']) => void }> = ({
  onAdd
}) => {
  const { t } = useTranslation();
  return (
    <AddWrapper>
      {visualizerTypes.map(v => (
        <Button key={v} type="primary" onClick={() => onAdd(v)}>
          <Add size={24} />
          {t('visualizer-config.add-visualizer', {
            name: t(`visualizer-config.${v}`)
          })}
        </Button>
      ))}
    </AddWrapper>
  );
};

interface VisualizerConfigPanelProps {
  config: VisualizerConfig;
  onChange?: (config: VisualizerConfig) => void;
}
export const VisualizerConfigPanel: VFC<VisualizerConfigPanelProps> = ({
  config,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {config.map((c, i) => (
        <VisualizerConfigContainer
          key={c.id}
          title={t(`visualizer-config.${c.type}`)}
          disableDownward={i === config.length - 1}
          disableUpward={i === 0}
          onMove={direction => {
            const n = i;
            const m = n + (direction === 'downward' ? 1 : -1);
            const a = [...config];
            [a[n], a[m]] = [a[m], a[n]];
            onChange(a);
          }}
          onDelete={() =>
            onChange(config.flatMap((c, j) => (i === j ? [] : [c])))
          }
        >
          {c.type === 'note-name' && (
            <NoteNameConfigPanel
              config={c}
              onChange={n => onChange(config.map((d, j) => (i === j ? n : d)))}
            />
          )}
          {c.type === 'keyboard' && (
            <KeyboardConfigPanel
              config={c}
              onChange={n => onChange(config.map((d, j) => (i === j ? n : d)))}
            />
          )}
          {c.type === 'innocence' && (
            <InnocenceConfigPanel
              config={c}
              onChange={n => onChange(config.map((d, j) => (i === j ? n : d)))}
            />
          )}
        </VisualizerConfigContainer>
      ))}
      <VisualizerAdd
        onAdd={type => onChange([...config, defaultVisualizerConfig(type)])}
      />
    </Wrapper>
  );
};
