import React, { type VFC } from 'react';
import styled from 'styled-components';
import { ValueEditor } from './ValueEditor';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Dim = styled.p`
  color: ${({ theme }) => theme.border.color};
  font-size: 80%;
`;

interface VolumeEditorProps {
  value?: number;
  onChange?: (value: number) => void;
}
export const VolumeEditor: VFC<VolumeEditorProps> = ({
  value = 1,
  onChange = () => void 0
}) => (
  <ValueEditor
    value={value}
    minValue={0}
    maxValue={1}
    step={0.001}
    onChange={value => onChange(Math.round(value * 1000) / 1000)}
  >
    {n => (
      <Center>
        <div>{n.toFixed(3)}</div>
        <Dim>{n === 0 ? '-∞' : (20 * Math.log10(n)).toFixed(1)} dB</Dim>
      </Center>
    )}
  </ValueEditor>
);
