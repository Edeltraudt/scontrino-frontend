import React, { useRef, useState } from "react";

import { Label, Card } from "./../../shared";
import { Form, Textarea } from "./../../Forms";

import { ReactComponent as NotesIcon } from "./../../shared/icons/edit.svg";

export const NotesField = ({ notes, onChange, ...props }) => {
  const [showField, setShowField] = useState(false);
  const inputRef = useRef(null);

  return (
    <Card chained>
      <Label htmlFor="notes" onClick={(e) => setShowField(true)} expand>
        <NotesIcon />
        <span>Notes</span>
      </Label>
      <Form.Row>
        {(showField || (inputRef.current && inputRef.current.value)) && (
          <Textarea
            id="notes"
            small
            placeholder="e.g. burgers"
            onChange={(e) => onChange(e.target.value)}
            onFocus={(e) => setShowField(true)}
            onBlur={(e) => setShowField(false)}
            defaultValue={notes}
            ref={inputRef}
          />
        )}
      </Form.Row>
    </Card>
  );
};
