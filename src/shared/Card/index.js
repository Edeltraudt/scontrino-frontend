import React from "react";
import styled from "styled-components";

import { base, colors } from "./../../theme";

export const CardBox = styled.div`
  background: ${colors.background};
  border-radius: ${base.radius};
  margin: auto;
  padding: 8% 10%;
  position: relative;
  transition: 0.15s ease box-shadow;
  will-change: box-shadow;
  width: 100%;

  ${({ chained, first }) =>
    (chained && !first) &&
    `
      margin-bottom: ${0.75 * 3}rem;
      margin-top: 0.75rem;

      &::before {
        background: ${colors.border};
        bottom: 100%;
        content: '';
        display: block;
        height: 0.75rem;
        left: 50%;
        margin: 0 0 0.75rem;
        position: absolute;
        width: 1px;
      }
    `}

  /* Flat card just serves as a wrapper */
  ${({ pure }) =>
    pure &&
    `
      background: transparent;
      box-shadow: none !important;
      display: flex;
      flex-flow: row wrap;
      margin-bottom: ${0.75 * 3 + 0.25}rem;
      padding: 0;
    `}
`;

const SuccessIcon = styled.span`
  background: ${colors.success};
  border-radius: 50%;
  color: ${colors.successInvert};
  display: flex;
  font-size: 2rem;
  height: 1em;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1em;

  &::before {
    content: "";
    border-bottom: 0.075em solid;
    border-left: 0.075em solid;
    height: 0.15em;
    transform: translateY(-1px) rotate(-45deg);
    content: "";
    margin: auto;
    width: 0.4em;
  }
`;

export const Card = ({ active, chained, pure, first, success, children }) => (
  <CardBox active={active} chained={chained} pure={pure} first={first}>
    {children}
    {success && <SuccessIcon />}
  </CardBox>
);
