import React, { type VFC } from 'react';
import styled from 'styled-components';
import {
  ArrowDownward,
  ArrowUpward,
  DeleteForever
} from '@styled-icons/material';

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: ${({ theme }) => theme.space()};
  overflow: hidden;
`;
const TitleBar = styled.div<{ noChildren: boolean }>`
  display: flex;
  align-items: center;
  ${({ noChildren, theme }) =>
    !noChildren ? `border-bottom: 1px solid ${theme.border.color};` : ''}
  gap: ${({ theme }) => theme.space()};
  font-weight: bold;
`;
const Title = styled.div`
  padding: ${({ theme }) => theme.space()};
`;
const ButtonsContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled.button<{ danger?: boolean; disabled?: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.space()};
  color: ${({ disabled, theme }) =>
    disabled ? theme.border.color : theme.color};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ theme, danger, disabled }) =>
      disabled ? 'unset' : danger ? theme.danger : theme.primary};
    ${({ disabled }) => (disabled ? '' : 'color: white;')}
  }
`;
const Spacer = styled.div`
  flex-grow: 1;
`;

interface VisualizerConfigContainerProps {
  children: React.ReactNode;
  title: React.ReactNode;
  disableDownward?: boolean;
  disableUpward?: boolean;
  onMove?: (direction: 'downward' | 'upward') => void;
  onDelete?: () => void;
}

export const VisualizerConfigContainer: VFC<VisualizerConfigContainerProps> = ({
  children,
  title,
  disableDownward = false,
  disableUpward = false,
  onMove = () => void 0,
  onDelete = () => void 0
}) => (
  <Wrapper>
    <TitleBar
      noChildren={
        !children || (children instanceof Array && !children.some(c => !!c))
      }
    >
      <Title>{title}</Title>
      <Spacer />
      <ButtonsContainer>
        <ButtonContainer
          disabled={disableDownward}
          onClick={() => {
            if (!disableDownward) {
              onMove('downward');
            }
          }}
        >
          <ArrowDownward size={24} />
        </ButtonContainer>
        <ButtonContainer
          disabled={disableUpward}
          onClick={() => {
            if (!disableUpward) {
              onMove('upward');
            }
          }}
        >
          <ArrowUpward size={24} />
        </ButtonContainer>
        <ButtonContainer danger onClick={onDelete}>
          <DeleteForever size={24} />
        </ButtonContainer>
      </ButtonsContainer>
    </TitleBar>
    {children}
  </Wrapper>
);
