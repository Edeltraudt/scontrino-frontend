import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Card, Label, Currency } from "./../../shared";
import { Input, Select, Form } from "./../../Forms";

const HiddenInput = styled(Input.Field)`
  &,
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
  const [amount, setAmount] = useState("");
  const [isInputActive, setIsInputActive] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(null);
  const inputElement = useRef(null);

  const handleChange = (e) => {
    setAmount(e.target.value);
    onExpenseChange(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 37:
      // falls through
      case 39:
        setCursorPosition(e.target.selectionStart);
        break;
      default:
        return;
    }
  };

  const handleCurrencyChange = (selected) => {
    setSelectedCurrency(selected);
    onCurrencyChange(selected);
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);

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
            <Currency
              cursorPosition={cursorPosition}
              amount={amount}
              active={isInputActive}
            />
          </Input.Fake>

          <HiddenInput
            type="text"
            id="expense"
            placeholder={"00.00"}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            onFocus={(e) => setIsInputActive(true)}
            onBlur={(e) => setIsInputActive(false)}
            value={amount}
            ref={inputElement}
          />
        </Input.Wrap>
      </Form.Row>
    </Card>
  );
};
