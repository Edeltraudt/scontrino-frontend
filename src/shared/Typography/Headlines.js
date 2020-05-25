import styled from "styled-components";

import { colors, font } from "./../../theme";

export const Title = styled.h1`
  color: ${colors.primary};
  font: 500 normal 2.5rem/1.25 ${font.headline};
`;

export const Headline = styled.h2`
  color: ${colors.secondaryInvert};
  font: 500 normal 1.5rem/1.25 ${font.headline};
`;
