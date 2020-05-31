import { createGlobalStyle } from "styled-components";

import { font, colors } from "./index";

export const bodyBackground = `linear-gradient(150deg, #F3F3F7 5%, #FFFFFF 90%)`;

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  * {
    box-sizing: inherit;
  }

  body {
    background-image: ${bodyBackground};
    background-attachment: fixed;
    color: ${colors.text};
    font: 400 normal 1rem/1.5 ${font.text};
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
  }
`;

export default GlobalStyles;
