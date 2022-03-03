import React, { useState, type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ConfigRow } from '../ui/ConfigRow';
import { GamepadButtonLabel } from '../ui/GamepadButtonLabel';
import { GamepadButtonAssign } from '../ui/GamepadButtonAssign';
import { Button } from '../ui/Button';
import { emptyConfig, type InputConfig } from '../../lib/input';

const keys = [
  'up',
  'down',
  'left',
  'right',
  'a',
  'b',
  'x',
  'y',
  'lb',
  'rb',
  'lt',
  'rt',
  'back',
  'start'
] as readonly (keyof InputConfig)[];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;

interface InputConfigPanelProps {
  config: InputConfig;
  onChange?: (config: InputConfig) => void;
}
export const InputConfigPanel: VFC<InputConfigPanelProps> = ({
  config,
  onChange
}) => {
  const { t } = useTranslation();
  const [readyIndex, setReadyIndex] = useState<number | undefined>(void 0);
  return (
    <Wrapper>
      {keys.map((key, i) => (
        <ConfigRow key={key} label={<GamepadButtonLabel button={key} />}>
          <GamepadButtonAssign
            button={config[key]}
            ready={readyIndex === i}
            warn={(
              Object.entries(config) as [
                keyof InputConfig,
                InputConfig[keyof InputConfig]
              ][]
            ).some(
              ([k, v]) =>
                v !== null &&
                k !== key &&
                config[key] !== null &&
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                config[key]!.index === v.index &&
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                config[key]!.button === v.button
            )}
            onChange={v => {
              if (onChange) onChange({ ...config, [key]: v });
              if (
                v === null ||
                i === keys.length - 1 ||
                config[keys[i + 1]] !== null
              )
                setReadyIndex(void 0);
              else setReadyIndex(i + 1);
            }}
            onClick={() => {
              if (i !== readyIndex) setReadyIndex(i);
              else setReadyIndex(void 0);
            }}
          />
        </ConfigRow>
      ))}
      <Button
        type="danger"
        onClick={() => {
          if (typeof onChange !== 'undefined') onChange(emptyConfig());
          setReadyIndex(void 0);
        }}
      >
        {t('input-config.reset')}
      </Button>
    </Wrapper>
  );
};
