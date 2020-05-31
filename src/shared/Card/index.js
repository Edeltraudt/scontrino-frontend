import React from "react";
import styled from "styled-components";
import { mix } from "polished";

import { base, colors, animations } from "./../../theme";

export const CardBox = styled.div`
  background: ${colors.background};
  border-radius: ${base.radius};
  margin: auto;
  padding: 8% 10%;
  position: relative;
  transition: 0.15s ease box-shadow;
  will-change: box-shadow;
  width: 100%;

  /* Flat card just serves as a wrapper */
  ${({ pure }) =>
    pure &&
    `
      background: transparent;
      box-shadow: none !important;
      display: flex;
      flex-flow: row wrap;
      padding: 0;
    `}
`;

const Icon = styled.span`
  animation: ${animations.rotate} 0.75s linear infinite;
  background: ${colors.success};
  border-radius: 50%;
  border: 0.075em solid ${mix(0.8, colors.successInvert, colors.success)};
  border-left-color: ${colors.success};
  box-sizing: content-box;
  color: ${colors.successInvert};
  display: flex;
  font-size: 1.75rem;
  height: 1em;
  opacity: 0;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transition: 0.15s ease;
  transition-property: border-color, opacity, visibility;
  visibility: hidden;
  width: 1em;

  &::before {
    background: currentColor;
    border-radius: inherit;
    content: "";
    height: 100%;
    position: absolute;
    transition: transform 0.2s ease;
    width: 100%;
  }

  &::after {
    border-bottom: 0.075em solid;
    border-left: 0.075em solid;
    content: "";
    content: "";
    height: 0.15em;
    margin: auto;
    position: relative;
    transform: translateY(-1px) rotate(-45deg);
    width: 0.4em;
  }

  ${({ visible }) => visible && `
      opacity: 1;
      visibility: visible;
    `}

  ${({ success }) =>
    success &&
    `
      animation: none;
      border-color: ${colors.success};

      &::before {
        transform: scale(0);
      }
    `}
`;

export const Card = ({
  active,
  pure,
  first,
  success,
  loading,
  children,
}) => (
  <CardBox active={active} pure={pure}>
    {children}
    <Icon success={success} visible={loading || success} />
  </CardBox>
);
