import React, { type VFC } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  color: 'default' | 'primary' | 'danger';
  fullWidth: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  ${({ fullWidth }) => (fullWidth ? 'flex: 1;' : '')}
  justify-content: center;
  align-items: center;
  background: ${({ color, theme }) =>
    color === 'default' ? theme.background : theme[color]};
  color: ${({ color, theme }) => (color === 'default' ? theme.color : 'white')};
  padding: ${({ color, theme }) =>
    color === 'default' ? `calc(${theme.space()} - 1px)` : theme.space()};
  ${({ color, theme }) =>
    color === 'default' ? `border: 1px solid ${theme.border.color};` : ''}
  border-radius: ${({ theme }) => theme.space()};
  cursor: pointer;
  user-select: none;
`;

interface ButtonProps {
  children?: React.ReactNode;
  type?: StyledButtonProps['color'];
  fullWidth?: boolean;
  onClick?: () => void;
}
export const Button: VFC<ButtonProps> = ({
  children,
  type = 'default',
  fullWidth = false,
  onClick
}) => (
  <StyledButton color={type} fullWidth={fullWidth} onClick={onClick}>
    {children}
  </StyledButton>
);
