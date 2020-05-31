import styled from "styled-components";

import { colors, font } from "./../../theme";

export const Title = styled.h1`
  color: ${colors.primary};
  font: 500 normal 1.75rem/1.25 ${font.headline};
  font-size: calc(1.75rem + 0.5vw);
`;

export const Headline = styled.h2`
  color: ${colors.secondaryInvert};
  font: 500 normal 1.375rem/1.25 ${font.headline};
  font-size: calc(1.25rem + 0.25vw);
`;
