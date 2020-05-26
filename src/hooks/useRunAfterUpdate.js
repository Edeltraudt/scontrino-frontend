import { useRef, useLayoutEffect } from "react";

export const useRunAfterUpdate = () => {
  const afterPaintRef = useRef(null);

  useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current();
      afterPaintRef.current = null;
    }
  });

  const runAfterUpdate = (fn) => (afterPaintRef.current = fn);
  return runAfterUpdate;
};
