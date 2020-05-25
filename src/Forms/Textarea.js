import React from "react";
import styled from "styled-components";

import { colors } from "./../theme";

const Field = styled.textarea`
  background: transparent;
  border: 0;
  color: ${colors.text};
  cursor: initial;
  font: inherit;
  font-size: 1.125rem;
  height: 1.5em;
  line-height: 1.5em;
  margin: 0.4rem 0;
  position: relative;
  width: 100%;

  &::placeholder {
    color: ${colors.inactive};
    opacity: 1;
  }
`;

export const Textarea = ({ small, ...props }) => {
  return <Field {...props} />;
};
