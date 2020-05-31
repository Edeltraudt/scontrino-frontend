import { transparentize } from "polished";
import { colors } from "./colors";

export const misc = {
  radius: "1rem",
  radiusSmall: "0.625rem",
  shadow: `
      0 4px 40px -10px ${transparentize(0.85, colors.headline)},
      2px 8px 70px -10px ${transparentize(0.9, colors.headline)},
      0 2px 5px -1px ${transparentize(0.85, colors.headline)}
    `,
};
