import React, { useState } from "react";

import { Label, Card } from "./../../shared";
import { Input, Form } from "./../../Forms";

export const NameField = ({ name, onChange }) => {
  return (
    <Card chained>
      <Label htmlFor="name" expand>
        What is this payment for?
      </Label>
      <Form.Row>
        <Input.Wrap large>
          <Input.Field
            placeholder="e.g. eating out"
            id="name"
            defaultValue={name}
            onChange={onChange}
          />
        </Input.Wrap>
      </Form.Row>
    </Card>
  );
};
