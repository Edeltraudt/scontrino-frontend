import React from "react";

import { Label, Card } from "./../../shared";
import { Form } from "./../../Forms";

import { Datepicker } from "./../Datepicker";

export const DateField = ({ success, loading, date, onChange }) => {
  return (
    <Card success={success} loading={loading}>
      <Label htmlFor="date" expand>
        {/* TODO: wording */}
        From when is this expense?
      </Label>
      <Form.Row>
        <Datepicker id="date" date={date} onChange={onChange} />
      </Form.Row>

      {/* TODO: recurring expenses */}
      {/* <Form.Row> */}
      {/*   <Lightswitch id="recurring" label="This is a recurring expense" /> */}
      {/* </Form.Row> */}
    </Card>
  );
};
