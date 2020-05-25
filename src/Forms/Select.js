import React from "react";

import { Input } from "./Input";

export const Select = ({ options }) => {
  return (
    <Input.Wrap>
      <span>{options[0]}</span>
    </Input.Wrap>
  );
};
