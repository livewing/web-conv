import React, { type VFC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space()};
  margin-top: ${({ theme }) => theme.space()};
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Line = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.border.color};
  min-width: ${({ theme }) => theme.space()};
  flex: 1;
`;

interface ConfigSectionBarProps {
  children?: React.ReactNode;
}
export const ConfigSectionBar: VFC<ConfigSectionBarProps> = ({ children }) => (
  <Wrapper>
    <Line />
    {typeof children !== 'undefined' && (
      <>
        <Title>{children}</Title>
        <Line />
      </>
    )}
  </Wrapper>
);
