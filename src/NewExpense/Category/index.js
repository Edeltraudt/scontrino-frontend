import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { colors } from "./../../theme";
import { Label, CardBox } from "./../../shared";
import { HiddenInput } from "./../../Forms";

const Wrap = styled(CardBox)`
  color: ${colors.label};
  flex: 1 0 calc(20% - 1rem);
  margin: 0.5rem;
  padding: 1.25rem 0.5rem;
  text-align: center;
  transition: 0.15s ease;
  transition-property: background, color, box-shadow;

  @media only screen and (min-width: 64em) {
    flex-grow: 0;
  }

  &:focus-within {
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.primary)} !important;
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
`;

export const Category = ({ label, icon, checked, id, name, onChange }) => (
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
