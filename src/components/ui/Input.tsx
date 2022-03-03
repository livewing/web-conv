import styled from 'styled-components';

export const Input = styled.input`
  flex: 1;
  padding: calc(${({ theme }) => theme.space()} - 1px);
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: ${({ theme }) => theme.space()};
  color: unset;
  background: unset;
  appearance: none;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;
