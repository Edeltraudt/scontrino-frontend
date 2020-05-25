import React from "react";
import styled from "styled-components";

import { Button } from "./../../shared";

const Wrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1.125rem 0 0;
  position: relative;
  width: 100%;
`;

const Value = styled.strong`
  font-size: 2rem;
  font-weight: 500;
  flex: 1;
  margin: 0 1.5rem;
`;

export const Datepicker = ({ id, props }) => {
  return (
    <Wrap>
      <Button type="button">Prev</Button>
      <Value>Today, May 25</Value>
      <Button type="button" disabled>
        Next
      </Button>
    </Wrap>
  );
};
