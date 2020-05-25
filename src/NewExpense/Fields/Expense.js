import React, { useState } from "react";

import { Card, Label } from "./../../shared";
import { Input, Select, Form } from "./../../Forms";

export const ExpenseField = ({
  onExpenseChange,
  onCurrencyChange,
  ...props
}) => {
  const [currency, setCurrency] = useState(props.currency);
  const [value, setValue] = useState(props.expense);

  // TODO: format input value
  // move number from right to left
  const handleInput = (e) => {
    setValue(e.target.value);
    onExpenseChange(e.target.value);
  };

  const handleCurrencyChange = (selected) => {
    setCurrency(selected);
    onCurrencyChange(selected);
  };

  return (
    <Card active chained>
      <Label htmlFor="expense" expand>
        How much did you spend?
      </Label>

      <Form.Row>
        <Input.Wrap large>
          <Select options={["EUR", "USD"]} onChange={setCurrency} />
        </Input.Wrap>

        <Input.Wrap huge>
          <Input.Field
            placeholder="00,00"
            id="expense"
            onChange={handleInput}
            value={value}
          />
        </Input.Wrap>
      </Form.Row>
    </Card>
  );
};
