import React, { type VFC } from 'react';
import styled from 'styled-components';

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #80808080;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 10000;
`;
const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: ${({ theme }) => theme.space()};
  border-radius: ${({ theme }) => theme.space()};
  box-shadow: 0 0 10px -5px ${({ theme }) => theme.color};
`;

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}
export const Modal: VFC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!(isOpen ?? false)) {
    return null;
  }
  return (
    <Dim onClick={onClose}>
      <Container onClick={e => e.stopPropagation()}>{children}</Container>
    </Dim>
  );
};
