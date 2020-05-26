import React from "react";

import { Label, Card } from "./../../shared";
import { Input, Form } from "./../../Forms";

export const NameField = ({ name, success, onChange }) => {
  return (
    <Card chained success={success}>
      <Label htmlFor="name" expand>
        What is this payment for?
      </Label>
      <Form.Row>
        <Input.Wrap large>
          <Input.Field
            placeholder="e.g. eating out"
            id="name"
            defaultValue={name}
            onChange={(e) => onChange(e.target.value)}
          />
        </Input.Wrap>
      </Form.Row>
    </Card>
  );
};
