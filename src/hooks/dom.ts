import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject
} from 'react';

export const useAnimationFrame = (
  callback: (ms: { timestamp: number; delta: number }) => void
) => {
  const idRef = useRef<number>();
  const timestampRef = useRef<number>();
  const loop = useCallback(
    (timestamp: number) => {
      if (typeof timestampRef.current === 'undefined')
        timestampRef.current = timestamp;
      const delta = timestamp - timestampRef.current;
      timestampRef.current = timestamp;
      callback({ timestamp, delta });
      idRef.current = requestAnimationFrame(loop);
    },
    [callback]
  );
  useEffect(() => {
    idRef.current = requestAnimationFrame(loop);
    return () => {
      if (typeof idRef.current !== 'undefined') {
        cancelAnimationFrame(idRef.current);
      }
    };
  }, [loop]);
};

export const useDevicePixelRatio = () => {
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  useLayoutEffect(() => {
    const media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const listener = () => setDpr(window.devicePixelRatio);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return dpr;
};

export const useResizeObserver = (
  target: RefObject<Element>,
  options?: ResizeObserverOptions
) => {
  const [entries, setEntries] = useState<ResizeObserverEntry[]>();
  useLayoutEffect(() => {
    const observer = new ResizeObserver(setEntries);
    if (target.current !== null) observer.observe(target.current, options);
    return () => observer.disconnect();
  }, [target, options]);
  return entries;
};
