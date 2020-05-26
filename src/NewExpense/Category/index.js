import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { colors } from "./../../theme";
import { Label, Card } from "./../../shared";
import { HiddenInput } from "./../../Forms";

const Wrap = styled(Card)`
  color: ${colors.label};
  flex: 0 0 calc(20% - ${4 / 5}rem);
  padding: 1.25rem 0.5rem;
  text-align: center;
  transition: 0.15s ease;
  transition-property: background, color, box-shadow;

  & + & {
    margin-left: 1rem;
  }

  &:focus-within {
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.primary)};
  }

  ${({ active }) =>
    active &&
    `
      background: ${colors.primary};
      color: ${colors.primaryInvert};
    `}
`;

const CategoryLabel = styled(Label)`
  color: inherit;
  font-weight: 400;

  svg {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: block;
  height: 2rem;
  margin: 0.75rem auto 1.25rem;
  width: 2rem;
`

export const Category = ({ label, icon, checked, id, name, onChange }) => {
  return (
    <Wrap active={checked}>
      <HiddenInput
        type="radio"
        id={id}
        name={name}
        defaultChecked={checked}
        onChange={onChange}
      />
      <CategoryLabel htmlFor={id} expand>
        <Icon>{icon}</Icon>
        {label}
      </CategoryLabel>
    </Wrap>
  );
};
