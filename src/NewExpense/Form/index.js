import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { colors } from "./../../theme";
import { CardBox, FocusWithin } from "./../../shared";

const Wrap = styled.div`
  max-width: 45rem;
  width: 100%;
`;

const Field = styled.div`
  transition: transform 0.3s ease;
  transform: scale(0.95);

  ${({ active }) => active && `
    transform: scale(1);

    ${CardBox} {
      box-shadow: 0 4px 48px -12px ${transparentize(0.9, colors.text)},
        0 2px 8px -1px ${transparentize(0.96, colors.text)};
    }
  `}
`;

export const Form = ({ children }) => {
  const [activeField, setActiveField] = useState(0);

  const itemRefs = useRef([]);
  const wrapRef = useRef();
  const isMounted = useRef(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    isMounted.current = true;
    scrollToElement(0);
  }, []);

  const handleFocusChange = (id) => {
    setActiveField(id);
    scrollToElement(id);
  };

  const scrollToElement = (id) => {
    const element = itemRefs.current[id];
    const offset = element.offsetTop;
    const elementMiddle = element.clientHeight / 2;
    const windowMiddle = window.innerHeight * 0.45;

    const top = offset - windowMiddle + elementMiddle;

    if (top !== document.documentElement.scrollTop) {
      window.scrollTo({ top, behavior: "smooth" });
      scrollPosition.current = top;
    }
  };

  const addRef = (node) => {
    if (isMounted) {
      itemRefs.current = [...itemRefs.current, node];
    }
  };

  const focusNextInput = (nextId) => {
    const input = itemRefs.current[nextId]
      .querySelector('input:checked, input, textarea, button');

    if (input) {
      handleFocusChange(nextId);
      input.focus();
    } else {
      focusNextInput(nextId + 1)
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusNextInput(activeField + 1);
    }
  }

  return (
    <Wrap ref={wrapRef}>
      {children &&
        React.Children.map(children, (child, id) => {
          const active = !child.props.disabled && activeField === id;

          return (
            <Field
              data-id={id}
              active={active}
              onKeyUp={handleKeyUp}
              key={id}
              ref={addRef}
            >
              {child.props.disabled ? (
                child
              ) : (
                <FocusWithin onFocus={(event) => handleFocusChange(id)}>
                  {React.cloneElement(child, { active, first: id === 0 })}
                </FocusWithin>
              )}
            </Field>
          );
        })}
    </Wrap>
  );
};
