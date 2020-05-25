import React, { useState } from "react";

import { Card } from "./../../shared";
import { Form, Range, Lightswitch } from "./../../Forms";

export const GroupField = ({ onChange, ...props }) => {
  const [isShared, setIsShared] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <Card chained>
      <Form.Row>
        <Lightswitch
          id="shared"
          label="Did you share this expense with your group?"
          onChange={(state) => {
            const sharedValue = state ? 0.5 : 0;

            setIsShared(state);
            setValue(sharedValue);
            onChange(sharedValue);
          }}
        />
      </Form.Row>
      {isShared && (
        <Form.Row>
          <Range
            min="0"
            max="1"
            step="0.05"
            minLabel="All you"
            maxLabel="All them"
            defaultValue={value}
            onChange={onChange}
          />
        </Form.Row>
      )}
    </Card>
  );
};
