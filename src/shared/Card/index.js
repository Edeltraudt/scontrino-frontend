import styled from "styled-components";

import { base, colors } from "./../../theme";

export const Card = styled.div`
  background: ${colors.background};
  border-radius: ${base.radius};
  margin: auto;
  padding: 8% 10%;
  position: relative;
  width: 100%;

  ${({ chained }) =>
    chained &&
    `
      margin-bottom: ${0.75 * 3}rem;

      & + & {
        margin-top: 0.75rem;

        &::before {
          background: ${colors.border};
          bottom: 100%;
          content: '';
          display: block;
          height: 0.75rem;
          left: 50%;
          margin: 0 0 0.75rem -1px;
          position: absolute;
          width: 1px;
        }
      }
    `}

  /* Flat card just serves as a wrapper */
  ${({ flat }) =>
    flat &&
    `
      background: transparent;
      box-shadow: none;
      display: flex;
      padding: 0;
    `}
`;
