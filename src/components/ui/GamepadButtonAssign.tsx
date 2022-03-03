import React, { type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Delete } from '@styled-icons/material';
import { useGamepads } from '../../contexts/gamepad';
import type { GamepadButton } from '../../lib/input';

const Wrapper = styled.div<{ ready: boolean; warn: boolean; down: boolean }>`
  display: inline-flex;
  border: 1px solid
    ${({ warn, theme }) => (warn ? theme.danger : theme.border.color)};
  border-radius: ${({ theme }) => theme.space()};
  ${({ down, theme }) =>
    down ? `box-shadow: 0 0 0 2px ${theme.primary};` : ''}
  width: 100px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
`;
const None = styled.div<{ ready: boolean }>`
  color: ${({ ready, theme }) => (ready ? 'white' : theme.border.color)};
`;
const Some = styled.div<{ ready: boolean }>`
  color: ${({ ready, theme }) => (ready ? 'white' : theme.color)};
`;
const KeyButton = styled.button<{ ready: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ ready, theme }) => (ready ? 'white' : theme.color)};
  background: ${({ ready, theme }) =>
    ready ? theme.primary : theme.background};
  flex-grow: 2;
`;
const DeleteButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.danger};
  color: white;
  flex-grow: 1;
`;

interface GamepadButtonAssignProps {
  button?: GamepadButton | null;
  ready?: boolean;
  warn?: boolean;
  onChange?: (value: GamepadButton | null) => void;
  onClick?: () => void;
}
export const GamepadButtonAssign: VFC<GamepadButtonAssignProps> = ({
  button = null,
  ready = false,
  warn = false,
  onChange,
  onClick
}) => {
  const { t } = useTranslation();
  const gamepads = useGamepads(e => {
    const down = e.find(e => e.action === 'down');
    if (typeof down !== 'undefined' && onChange && ready) onChange(down.button);
  });
  const down = gamepads.some(
    g =>
      button !== null &&
      g !== null &&
      button.index === g.index &&
      g.buttons.some((b, i) => i === button.button && b.pressed)
  );
  const r = typeof onChange !== 'undefined' && ready;
  return (
    <Wrapper ready={r} warn={warn} down={down}>
      <KeyButton onClick={onClick} ready={r}>
        {button === null ? (
          <None ready={r}>{t('input-config.none')}</None>
        ) : (
          <Some ready={r}>
            {button.index} - {button.button}
          </Some>
        )}
      </KeyButton>
      {r && button !== null && (
        <DeleteButton onClick={() => r && onChange && onChange(null)}>
          <Delete size={24} />
        </DeleteButton>
      )}
    </Wrapper>
  );
};
