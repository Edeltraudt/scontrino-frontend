import React from "react";
import styled from "styled-components";

import { colors, animations } from "./../../theme";
import { decimalSeparator } from "./../../utility/currency";

const Wrap = styled.span`
  animation: ${animations.shake} 0.15s ease infinite paused;
  display: block;
  font-variant-numeric: tabular-nums;
  position: relative;
  z-index: 1;

  ${({ shake }) =>
    shake &&
    `
    animation-play-state: running;
  `}
`;

const Char = styled.span`
  position: relative;

  &::after {
    animation: ${animations.blink} 1.125s infinite;
    background: ${colors.inactive};
    bottom: 0;
    content: "";
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    width: 2px;
    z-index: -1;
  }

  ${({ hasCursor }) =>
    !hasCursor &&
    `
      &::after {
        content: none;
      }
    `}

  ${({ padding }) => padding && `color: ${colors.inactive}`}
`;

export const Currency = ({
  active,
  shake,
  amount: initialAmount,
  cursorPosition = 0,
  ...props
}) => {
  const value = parseFloat(initialAmount) / 100;
  const valueLength = initialAmount.length;

  let padded = "";
  let amount = "";

  if (isNaN(value)) {
    padded = `00${decimalSeparator}00`;
  } else {
    amount = value.toFixed(2);

    if (amount.length <= 4) padded += "0";

    if (amount.length <= 3) padded += "0";

    if (amount.length <= 2 && !amount.includes(decimalSeparator)) {
      padded += decimalSeparator;
    }
  }

  if (Number(amount) === 0) {
    padded = `00${decimalSeparator}00`;
    amount = "";
  }

  const full = padded + amount;

  let rightOffset = valueLength - cursorPosition;
  let leftOffset = full.length - 1 - rightOffset;
  let atBeginning = false;

  if (rightOffset > 1) {
    leftOffset -= 1;
  }

  if (leftOffset < 0) {
    atBeginning = true;
  }

  return (
    <Wrap shake={shake}>
      <Char hasCursor={active && atBeginning} />
      {[...full].map((char, index) => (
        <Char
          key={index}
          hasCursor={active && index === leftOffset}
          padding={index < padded.length}
        >
          {char}
        </Char>
      ))}
    </Wrap>
  );
};
