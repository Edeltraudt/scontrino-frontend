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
  position: relative;

  ${({ plain }) =>
    !plain &&
    `
      &:not(:first-child)::before {
        background: ${colors.border};
        bottom: 100%;
        content: "";
        display: block;
        height: 0.75rem;
        margin: 0.75rem auto;
        width: 1px;
      }`}

  ${({ active }) =>
    active &&
    `
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

  return (
    <Wrap ref={wrapRef}>
      {children &&
        React.Children.map(children, (child, id) => {
          const active = !child.props.disabled && activeField === id;

          return (
            <Field
              data-id={id}
              active={active}
              plain={child.type.name === undefined}
              key={id}
              ref={addRef}
            >
              {child.props.disabled ? (
                child
              ) : (
                <FocusWithin onFocus={(event) => handleFocusChange(id)}>
                  {React.cloneElement(child, { active })}
                </FocusWithin>
              )}
            </Field>
          );
        })}
    </Wrap>
  );
};
