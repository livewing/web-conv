import React, { useLayoutEffect, useRef, type VFC } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: calc(${({ theme }) => theme.space()} - 1px);
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: ${({ theme }) => theme.space()};
  color: unset;
  background: unset;
  cursor: pointer;
  appearance: none;
  outline: none;
`;
const StyledOption = styled.option`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

interface SelectProps {
  items?: string[];
  index?: number;
  onChange?: undefined | ((index: number) => void);
}
export const Select: VFC<SelectProps> = ({ items, index, onChange }) => {
  const ref = useRef<HTMLSelectElement>(null);
  useLayoutEffect(() => {
    if (ref.current !== null) ref.current.selectedIndex = index ?? -1;
  }, [index]);
  return (
    <StyledSelect
      ref={ref}
      defaultValue={index}
      onChange={e => onChange && onChange(Number.parseInt(e.target.value))}
    >
      {items?.map((item, i) => (
        <StyledOption key={i} value={i}>
          {item}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
