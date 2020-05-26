import { keyframes } from "styled-components";

export const animations = {
  shake: keyframes`
      0% { transform: translateX(0px) }
     25% { transform: translateX(3px) }
     75% { transform: translateX(-3px) }
    100% { transform: translateX(0px) }
  `,

  blink: keyframes`
      0% { opacity: 1; }
     50% { opacity: 1; }
     60% { opacity: 0; }
     90% { opacity: 0; }
  `,
};
