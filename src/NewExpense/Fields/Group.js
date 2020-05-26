import React, { useState } from "react";

import { Card } from "./../../shared";
import { Form, Range, Lightswitch } from "./../../Forms";

export const GroupField = ({ onChange, sharing, ...props }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <Card chained>
      <Form.Row>
        <Lightswitch
          id="sharing"
          label="Did you share this expense with your group?"
          onChange={(state) => {
            const sharingValue = state ? 0.5 : 0;

            setIsSharing(state);
            setValue(sharingValue);
            onChange(sharingValue);
          }}
        />
      </Form.Row>
      {isSharing && (
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
