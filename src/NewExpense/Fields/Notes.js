import React, { useState } from "react";

import { Label, Card } from "./../../shared";
import { Form, Textarea } from "./../../Forms";

export const NotesField = ({ notes, onChange, ...props }) => {
  return (
    <Card chained>
      <Label htmlFor="notes" expand>
        Notes
      </Label>
      <Form.Row>
        <Textarea
          small
          placeholder="e.g. burgers"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={notes}
        />
      </Form.Row>
    </Card>
  );
};
