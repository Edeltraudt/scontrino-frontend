import React from "react";
import styled from "styled-components";

import { colors } from "./../../theme";

import * as currency from "./../../utility/currency";

const Wrap = styled.span`
  font-variant-numeric: tabular-nums;
`;

const Padded = styled.span`
  color: ${colors.inactive};
`;

const Value = styled.span``;

export const Currency = ({ pad, ...props }) => {
  const { padded, amount } = currency.format(props.amount);

  return (
    <Wrap>
      {pad && <Padded>{padded}</Padded>}
      <Value>{amount}</Value>
    </Wrap>
  );
};
