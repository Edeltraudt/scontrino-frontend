import styled from "styled-components";
import { lighten, darken, transparentize, saturate } from "polished";

import { base, colors } from "./../../theme";

const hoverBackground = darken(0.04, colors.buttonBackground);
const activeBackground = darken(0.08, colors.buttonBackground);

export const Button = styled.button`
  background: ${colors.buttonBackground};
  border-radius: ${base.radiusSmall};
  border: 0;
  color: ${colors.text};
  cursor: pointer;
  font-size: 1.125rem;
  outline: 0;
  padding: 1em 2em 1.125em;
  position: relative;
  transition-property: background-color, border-color, box-shadow;
  transition: 0.15s ease-out;

  &:hover, &:focus {
    background-color: ${hoverBackground};
    border-color: ${hoverBackground};
  }

  &:active {
    background-color: ${activeBackground};
    border-color: ${activeBackground};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${transparentize(0.5, hoverBackground)};
  }

  & + & {
    margin-left: 1rem;
  }

  ${({ disabled }) => disabled && `pointer-events: none; opacity: 0.5;`}


  ${({ large }) => large && `font-size: 1.375rem;`}


  ${({ primary }) => {
    const hoverBackground = saturate(0.05, lighten(0.025, colors.primary));
    const activeBackground = saturate(0.05, darken(0.05, colors.primary));

    return (
      primary &&
      `
      background: ${colors.primary};
      color: ${colors.primaryInvert};

      &:hover, &:focus {
        background-color: ${hoverBackground};
        border-color: ${hoverBackground};
      }

      &:active {
        background-color: ${activeBackground};
        border-color: ${activeBackground};
      }

      &:focus {
        box-shadow: 0 0 0 3px ${transparentize(0.5, colors.primary)};
      }
    `
    );
  }}


  ${({ danger }) => {
    const hoverBackground = saturate(0.05, lighten(0.025, colors.dangerButton));
    const activeBackground = saturate(0.05, darken(0.05, colors.dangerButton));

    return (
      danger &&
      `
      background: ${colors.dangerButton};
      color: ${colors.dangerButtonText};

      &:hover, &:focus {
        background-color: ${hoverBackground};
        border-color: ${hoverBackground};
      }

      &:active {
        background-color: ${activeBackground};
        border-color: ${activeBackground};
      }

      &:focus {
        box-shadow: 0 0 0 3px ${transparentize(0.5, colors.dangerButton)};
      }
    `
    );
  }}
`;
