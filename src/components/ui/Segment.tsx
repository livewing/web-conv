import React, { type VFC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ vertical: boolean; fullWidth: boolean }>`
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: ${({ theme }) => theme.space()};
  overflow: auto;
`;
const SegmentButton = styled.button<{
  highlight: boolean;
  foreground?: string;
  vertical: boolean;
  fullWidth: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ fullWidth }) => (fullWidth ? 'flex: 1;' : '')}
  padding: calc(${({ theme }) => theme.space()} - 1px);
  background: ${({ highlight, foreground, theme }) =>
    highlight
      ? typeof foreground !== 'undefined'
        ? foreground
        : theme.primary
      : theme.background};
  color: ${({ highlight, foreground, theme }) =>
    highlight && typeof foreground !== undefined ? 'white' : theme.color};
  min-width: 2rem;
  user-select: none;
  cursor: ${({ highlight }) => (highlight ? 'default' : 'pointer')};
  &:not(:first-child) {
    ${({ vertical, theme }) =>
      `border-${vertical ? 'top' : 'left'}: 1px solid ${theme.border.color};`}
  }
  &:hover {
    ${({ highlight, foreground, vertical, theme }) =>
      !highlight
        ? `border-${vertical ? 'right' : 'bottom'}: 2px solid ${
            typeof foreground !== 'undefined' ? foreground : theme.primary
          };`
        : ''}
    ${({ highlight, vertical, theme }) =>
      !highlight
        ? `padding-${
            vertical ? 'right' : 'bottom'
          }: calc(${theme.space()} - 2px - 1px);`
        : ''}
  }
`;

interface SegmentProps {
  items?: (React.ReactNode | { node: React.ReactNode; foreground: string })[];
  index?: number;
  vertical?: boolean;
  fullWidth?: boolean;
  onChange?: (index: number) => void;
}
export const Segment: VFC<SegmentProps> = ({
  items,
  index,
  vertical = false,
  fullWidth = false,
  onChange
}) => (
  <Wrapper vertical={vertical} fullWidth={fullWidth}>
    {items?.map((item, i) => {
      const { node, foreground } =
        typeof item === 'object' && item !== null && 'foreground' in item
          ? item
          : { node: item, foreground: void 0 };
      return (
        <SegmentButton
          key={i}
          highlight={index === i}
          foreground={foreground}
          vertical={vertical}
          fullWidth={fullWidth}
          onClick={() => {
            if (onChange && index !== i) onChange(i);
          }}
          disabled={index === i}
        >
          {node}
        </SegmentButton>
      );
    })}
  </Wrapper>
);
