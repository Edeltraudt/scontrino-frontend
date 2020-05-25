import styled from "styled-components";

import { colors } from "./../theme";

const Wrap = styled.div`
  font-weight: 500;
  line-height: 1;
  height: 1.25em;
  position: relative;

  ${({ huge }) =>
    huge &&
    `
      font-size: 4rem;
      height: 1em;
    `}

  ${({ large }) => large && `font-size: 2.5rem;`}
`;

const Field = styled.input`
  background: transparent;
  border: 0;
  color: ${colors.text};
  cursor: initial;
  height: inherit;
  font: inherit;
  position: relative;
  width: 100%;

  &::placeholder {
    color: ${colors.inactive};
  }
`;

export const Input = { Wrap, Field };
