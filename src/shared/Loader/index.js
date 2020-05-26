import styled, { keyframes } from "styled-components";

import { colors } from "./../../theme";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  animation: ${rotate} 0.75s linear infinite paused;
  border: 0.125em solid transparent;
  border-left-color: ${colors.primary};
  border-radius: 1em;
  height: 2em;
  font-size: 1rem;
  margin: auto;
  opacity: 0;
  transition: 0.15s 0.1s ease opacity;
  width: 2em;

  ${({ active }) =>
    active &&
    `
      animation-play-state: running;
      opacity: 1;
    `}
`;
