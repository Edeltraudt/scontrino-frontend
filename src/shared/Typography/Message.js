import styled from "styled-components";

import { colors, font } from "./../../theme";

export const Message = styled.p`
  color: ${colors.label};
  font: 400 normal 1rem ${font.text};
  margin: 0;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }

  ${({ danger }) => danger && `color: ${colors.danger};`}

  ${({ focus }) =>
    focus &&
    `
      font-weight: 500;
      font-size: 1.25rem;
    `}

  ${({ centered }) => centered && `text-align: center;`}
`;
