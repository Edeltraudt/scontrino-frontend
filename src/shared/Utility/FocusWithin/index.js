import React, { useRef } from "react";

export const FocusWithin = ({ onFocus, onBlur, children }) => {
  const containerRef = useRef();
  const isFocused = useRef(false);

  const handleFocus = (event) => {
    if (!isFocused.current && onFocus) {
      isFocused.current = true;
      // event.persist();
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    isFocused.current = false;

    if (onBlur) {
      isFocused.current = isFocusWithin();

      if (!isFocused.current && onBlur) {
        event.persist();
        onBlur(event);
      }
    }
  };

  const isFocusWithin = () => {
    if (!containerRef.current) return false;
    return containerRef.current.contains(document.activeElement);
  };

  return (
    <div onFocus={handleFocus} onBlur={handleBlur} ref={containerRef}>
      {children}
    </div>
  );
};
