import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Card, Label, Currency } from "./../../shared";
import { Input, Select, Form } from "./../../Forms";

import { colors } from "./../../theme";
import { useRunAfterUpdate } from "./../../hooks";

import * as currency from "./../../utility/currency";

const HiddenInput = styled(Input.Field)`
  caret-color: ${colors.text};
  color: transparent;

  &::placeholder {
    color: transparent;
  }
`;

export const ExpenseField = ({
  onExpenseChange,
  onCurrencyChange,
  ...props
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(props.currency);
  const [amount, setAmount] = useState(currency.format(props.expense).full);
  const inputElement = useRef(null);
  const runAfterUpdate = useRunAfterUpdate();

  const filterInput = (value, cursor) => {
    const strip = (str) => str.replace(/[^0-9.]/g, "");

    const beforeCursor = value.slice(0, cursor);
    const afterCursor = value.slice(cursor, value.length);

    const filterBeforeCursor = strip(beforeCursor);
    const filterAfterCursor = strip(afterCursor);

    const newValue = filterBeforeCursor + filterAfterCursor;
    const newCursor = filterBeforeCursor.length;

    return [newValue, newCursor];
  };

  const handleInput = (e) => {
    let value = e.target.value;
    const cursor = inputElement.current.selectionStart;
    const [newValue, newCursor] = filterInput(value, cursor);

    runAfterUpdate(() => {
      inputElement.current.selectionStart = newCursor;
      inputElement.current.selectionEnd = newCursor;
    });

    setAmount(currency.format(currency.deformat(newValue)).full);
    onExpenseChange(currency.deformat(value));
  };

  const handleCurrencyChange = (selected) => {
    setSelectedCurrency(selected);
    onCurrencyChange(selected);
  };

  return (
    <Card active chained>
      <Label htmlFor="expense" expand>
        How much did you spend?
      </Label>

      <Form.Row>
        <Input.Wrap large>
          <Select
            options={["EUR", "USD"]}
            onChange={handleCurrencyChange}
            selected={selectedCurrency}
          />
        </Input.Wrap>

        <Input.Wrap huge>
          <Input.Fake htmlFor="expense">
            <Currency amount={amount} pad />
          </Input.Fake>

          <HiddenInput
            type="text"
            id="expense"
            placeholder={currency.format("").full}
            onChange={handleInput}
            value={amount}
            ref={inputElement}
          />
        </Input.Wrap>
      </Form.Row>
    </Card>
  );
};

