import styled from "styled-components";

import { colors } from "./../../theme";

export const Label = styled.label`
  color: ${colors.label};
  cursor: pointer;
  font-size: calc(1rem + 0.125vw);
  font-weight: 500;
  line-height: 1.25;
  margin: 0 0 0.25em;

  svg {
    display: inline-block;
    opacity: 0.625;
    margin-top: -2px;

    &:not(:only-child) {
      vertical-align: middle;
    }

    &:not(:last-child) {
      margin-right: 0.75em;
    }
  }


  /* Expand the click area to the next relative parent */
  ${({ expand }) =>
    expand &&
    `
      &::after {
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }
    `}
`;
