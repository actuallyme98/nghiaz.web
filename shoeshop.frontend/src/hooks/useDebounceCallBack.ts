import { DependencyList, useCallback, useRef, useEffect } from 'react';
function useDebounceCallBack<T extends (...args: any[]) => void>(
  callback: T,
  timeout: number,
  deps: DependencyList,
) {
  const ref = useRef(callback);
  const refInterval = useRef<number>();
  const f = useCallback(callback, deps);

  useEffect(() => {
    ref.current = f;
    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, [f]);

  const newFunction = useCallback(
    (...args) => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
      refInterval.current = window.setTimeout(() => {
        ref.current(...args);
        refInterval.current = undefined;
      }, timeout);
    },
    [timeout],
  );
  return newFunction as T;
}

export default useDebounceCallBack;
