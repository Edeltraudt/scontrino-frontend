import React, { useState } from "react";
import styled from "styled-components";

import { colors } from "./../theme";
import { Label } from "./../shared";

const RealInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1px;
`;

const FakeSwitch = styled.span`
  background: ${colors.checkboxBackground};
  border-radius: 1.5rem;
  box-sizing: content-box;
  cursor: pointer;
  height: 1.5rem;
  margin-bottom: -2px;
  margin-right: 1.5rem;
  padding: 2px;
  transition: 0.2s ease background-color;
  width: 2.75rem;

  &::before {
    background: ${colors.background};
    border-radius: inherit;
    content: "";
    height: 1.5rem;
    position: absolute;
    transition: 0.2s ease transform;
    width: 1.5rem;
  }

  ${({ checked }) =>
    checked &&
    `
      background-color: ${colors.primary};

      &::before { transform: translateX(1.25rem) }
    `};
`;

const LightswitchLabel = styled(Label)`
  align-items: center;
  display: flex;
  font-weight: 400;
  position: relative;
  user-select: none;
`;

export const Lightswitch = ({ label, id, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);

    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <>
      <RealInput type="checkbox" id={id} onChange={handleChange} />
      <LightswitchLabel htmlFor={id}>
        <FakeSwitch checked={isChecked} />
        <span>{label}</span>
      </LightswitchLabel>
    </>
  );
};
