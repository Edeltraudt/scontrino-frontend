import { transparentize } from "polished";

export const bodyBackground = `linear-gradient(135deg, #E8E8ED, #FFFFFF 150%)`;

export const colors = {
  background: "#FFFFFF",
  borderSoft: "#F5F5F7",
  border: "#DADAE6",
  inactive: "#BBBBC4",
  label: "#717180",
  headline: "#717180",
  text: "#3D3D4D",
  buttonBackground: "#F0F0F5",
  checkboxBackground: "#DFDFE8",

  primary: "#228B5A",
  primaryInvert: "#FFFFFF",
};

export const base = {
  radius: "1rem",
  radiusSmall: "0.625rem",
  shadow: `
      0 4px 40px -10px ${transparentize(0.85, colors.headline)},
      2px 8px 70px -10px ${transparentize(0.9, colors.headline)},
      0 2px 5px -1px ${transparentize(0.85, colors.headline)}
    `,
};

export const font = {
  text: "IBM Plex Sans, Roboto, sans-serif",
  headline: "IBM Plex Sans, Roboto, sans-serif",
};
