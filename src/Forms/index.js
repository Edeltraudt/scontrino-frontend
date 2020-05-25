import styled from "styled-components";

import { colors } from "./../theme";

const Row = styled.div`
  align-items: baseline;
  display: flex;

  > :not(:last-child) {
    margin-right: 0.35em;
  }

  & + & {
    border-top: 1px solid ${colors.borderSoft};
    margin-top: 2rem;
    padding-top: 2rem;
  }
`


export const Form = { Row }


export * from "./HiddenInput";
export * from "./Input";
export * from "./Lightswitch";
export * from "./Range";
export * from "./Select";
export * from "./Textarea";
