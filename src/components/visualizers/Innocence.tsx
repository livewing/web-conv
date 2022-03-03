import React, { useEffect, useLayoutEffect, useRef, type VFC } from 'react';
import styled from 'styled-components';
import {
  useAnimationFrame,
  useDevicePixelRatio,
  useResizeObserver
} from '../../hooks/dom';
import { usePrevious } from '../../hooks/util';
import type { Innocence as InnocenceConfig } from '../../lib/visualizer';
import type { Pressing } from '../../hooks/synth';

const Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

interface InnocenceObject {
  type: 'line' | 'triangle' | 'square' | 'circle';
  x: number;
  y: number;
  r: number;
  t: number;
}

interface InnocenceProps {
  visualizerConfig: InnocenceConfig;
  pressing: Pressing[];
}

export const Innocence: VFC<InnocenceProps> = ({
  visualizerConfig,
  pressing
}) => {
  const objects = useRef<InnocenceObject[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const wrapperResizeEntries = useResizeObserver(wrapperRef);
  const dpr = useDevicePixelRatio();
  const prevPressing = usePrevious(pressing);
  useEffect(() => {
    const cur = Array.from(new Set(pressing.map(p => p.button)));
    const prev = new Set((prevPressing ?? []).map(p => p.button));
    const n = cur.reduce((a, c) => a + (prev.has(c) ? 0 : 1), 0);
    if (n > 0) {
      objects.current.push(
        ...[...Array(n)].map(() => ({
          type:
            visualizerConfig.shape === 'random'
              ? (['line', 'square', 'triangle', 'circle'] as const)[
                  Math.floor(Math.random() * 4)
                ]
              : visualizerConfig.shape,
          x: Math.random(),
          y: Math.random(),
          r: Math.random(),
          t: 0
        }))
      );
    }
  }, [visualizerConfig.shape, pressing.length, prevPressing, pressing]);
  useLayoutEffect(() => {
    if (
      canvasRef.current === null ||
      typeof wrapperResizeEntries === 'undefined'
    )
      return;
    const { width, height } = wrapperResizeEntries[0].contentRect;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
  }, [dpr, wrapperResizeEntries]);
  useAnimationFrame(({ delta }) => {
    if (canvasRef.current === null) return;
    if (typeof contextRef.current === 'undefined') {
      const context = canvasRef.current.getContext('2d');
      if (context === null) return;
      contextRef.current = context;
    }
    const ctx = contextRef.current;
    const { width, height } = canvasRef.current;
    const size = Math.min(width, height);

    // update
    objects.current = objects.current.flatMap(o =>
      o.t + delta > 1000 ? [] : [{ ...o, t: o.t + delta }]
    );

    // draw
    ctx.lineWidth = height / 25;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';
    objects.current.forEach(({ type, x, y, r, t }) => {
      ctx.save();

      ctx.beginPath();
      ctx.translate(((x - 0.5) * width) / 2, ((y - 0.5) * height) / 2);
      ctx.translate(width / 2, height / 2);
      ctx.rotate(
        (r +
          (type === 'line' || type === 'circle' ? 0 : (Math.PI * t) / 4000)) *
          2 *
          Math.PI
      );
      if (type !== 'line') ctx.scale((2 * t) / 1000, (2 * t) / 1000);
      ctx.translate(-width / 2, -height / 2);

      ctx.strokeStyle = `rgba(0, 255, 0, ${(1000 - t) / 1000})`;

      switch (type) {
        case 'line':
          ctx.moveTo(-width, height / 2);
          ctx.lineTo(width * 2, height / 2);
          ctx.stroke();
          break;
        case 'square':
          ctx.strokeRect(
            width / 2 - size / 2,
            height / 2 - size / 2,
            size,
            size
          );
          break;
        case 'triangle':
          ctx.moveTo(
            width / 2 - size / Math.sqrt(3),
            height / 2 + size / 2 - size / 6
          );
          ctx.lineTo(
            width / 2 + size / Math.sqrt(3),
            height / 2 + size / 2 - size / 6
          );
          ctx.lineTo(width / 2, height / 2 - size / 2 - size / 6);
          ctx.closePath();
          ctx.stroke();
          break;
        case 'circle':
          ctx.arc(width / 2, height / 2, size / 2, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = type;
        }
      }

      ctx.restore();
    });
  });
  return (
    <Wrapper ref={wrapperRef}>
      <canvas ref={canvasRef} />
    </Wrapper>
  );
};
