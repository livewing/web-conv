import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type VFC,
  type PointerEvent
} from 'react';
import styled from 'styled-components';
import { Add, HorizontalRule } from '@styled-icons/material';
import { clamp } from '../../lib/number';

const Wrapper = styled.div<{ editing: boolean }>`
  display: inline-flex;
  position: relative;
  border: 1px solid
    ${({ editing, theme }) => (editing ? theme.primary : theme.border.color)};
  border-radius: ${({ theme }) => theme.space()};
  overflow: hidden;
`;
const NotEditing = styled.div<{ editing: boolean }>`
  display: inline-flex;
  visibility: ${({ editing }) => (editing ? 'hidden' : 'visible')};
`;
const Editing = styled.div<{ editing: boolean }>`
  display: ${({ editing }) => (editing ? 'inline-flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(${({ theme }) => theme.space()} - 1px);
  min-width: 100px;
  user-select: none;
  cursor: ew-resize;
`;
const Stepper = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(${({ theme }) => theme.space()} - 1px);
  background: ${({ disabled, theme }) =>
    disabled ? theme.border.color : theme.primary};
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: calc(${({ theme }) => theme.space()} - 1px);
  border: none;
  border-radius: 0;
  outline: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  font-size: 1rem;
  text-align: center;
`;

interface ValueEditorProps {
  children?: (value: number) => React.ReactNode;
  value: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  parse?: (s: string) => number | undefined;
  onChange?: (value: number) => void;
}
export const ValueEditor: VFC<ValueEditorProps> = ({
  children = v => v,
  value,
  minValue = Number.NEGATIVE_INFINITY,
  maxValue = Number.POSITIVE_INFINITY,
  step = 1,
  parse = Number,
  onChange = () => void 0
}) => {
  if (minValue > maxValue)
    throw new Error('minValue > maxValue is not allowed');
  const valueRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pointerPosition, setPointerPosition] = useState<[number, number]>();
  const [moved, setMoved] = useState(false);
  const [editing, setEditing] = useState(false);
  const change = useCallback(
    (n: number) => {
      onChange(clamp(minValue, maxValue, n));
    },
    [maxValue, minValue, onChange]
  );
  const applyInput = useCallback(() => {
    if (inputRef.current !== null) {
      const n = parse(inputRef.current.value);
      setEditing(false);
      if (typeof n === 'number' && !Number.isNaN(n)) change(n);
    }
  }, [change, parse]);
  const onDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    valueRef.current?.setPointerCapture(e.pointerId);
    setPointerPosition([e.clientX, e.clientY]);
  }, []);
  const onUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      valueRef.current?.releasePointerCapture(e.pointerId);
      setPointerPosition(void 0);
      if (!moved) setEditing(true);
      setMoved(false);
    },
    [moved]
  );
  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (typeof pointerPosition === 'undefined') return;
      const d =
        (e.clientX - pointerPosition[0] - (e.clientY - pointerPosition[1])) *
        step;
      change(value + d);
      setPointerPosition([e.clientX, e.clientY]);
      setMoved(true);
    },
    [change, pointerPosition, step, value]
  );
  useEffect(() => {
    if (editing && inputRef.current !== null) {
      inputRef.current.value = `${value}`;
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing, value]);
  return (
    <Wrapper editing={editing}>
      <NotEditing editing={editing}>
        <Stepper
          disabled={value <= minValue}
          onClick={() => change(value - step)}
        >
          <HorizontalRule size={18} />
        </Stepper>
        <Value
          ref={valueRef}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerMove={onMove}
        >
          {children(value)}
        </Value>
        <Stepper
          disabled={value >= maxValue}
          onClick={() => change(value + step)}
        >
          <Add size={18} />
        </Stepper>
      </NotEditing>
      <Editing editing={editing}>
        <Input
          ref={inputRef}
          size={0}
          onBlur={applyInput}
          onKeyDown={e => {
            if (e.key === 'Escape' || e.key === 'Enter') applyInput();
          }}
        />
      </Editing>
    </Wrapper>
  );
};
