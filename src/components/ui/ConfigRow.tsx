import React, { type VFC } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Line = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.border.color};
  margin: 0 ${({ theme }) => theme.space()};
  min-width: ${({ theme }) => theme.space()};
  flex-grow: 1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;

interface ConfigRowProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
}
export const ConfigRow: VFC<ConfigRowProps> = ({ label, children }) => {
  return (
    <Row>
      <Label>{label}</Label>
      <Line />
      <Container>{children}</Container>
    </Row>
  );
};
