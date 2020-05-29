import React, { useState } from "react";
import styled from "styled-components";

import { Label, Card } from "./../../shared";
import { Form, Textarea } from "./../../Forms";

import { ReactComponent as NotesIcon } from "./../../shared/icons/edit.svg";

const TextareaWrap = styled.div`
  opacity: 0;
  position: absolute;
  transition: 0s ease opacity;
  transition-property: opacity, visibility;

  ${({ active }) => active && `
      opacity: 1;
      position: static;
      transition-duration: 0.15s;
      width: 100%;
    `}
`;

export const NotesField = ({ notes, onChange, ...props }) => {
  const [showField, setShowField] = useState(false);

  return (
    <Card chained>
      <Label htmlFor="notes" onClick={(e) => setShowField(true)} expand>
        <NotesIcon />
        <span>Notes</span>
      </Label>
      <Form.Row>
        <TextareaWrap
          active={showField}
        >
          <Textarea
            id="notes"
            small
            placeholder="e.g. burgers"
            onChange={(e) => onChange(e.target.value)}
            onFocus={(e) => setShowField(true)}
            onBlur={(e) => setShowField(false)}
            defaultValue={notes}
          />
        </TextareaWrap>
      </Form.Row>
    </Card>
  );
};
