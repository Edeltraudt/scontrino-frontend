import { createGlobalStyle } from "styled-components";

import { bodyBackground, font, colors } from "./index";

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
