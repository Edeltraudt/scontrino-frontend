import React, { useState } from "react";
import styled from "styled-components";

import { Title } from "./../shared";

import {
  CategoryField,
  DateField,
  ExpenseField,
  GroupField,
  NameField,
  NotesField,
} from "./Fields";

import EssentialsIcon from "./../shared/icons/essentials.svg";
import LifestyleIcon from "./../shared/icons/lifestyle.svg";
import LuxuriesIcon from "./../shared/icons/luxuries.svg";
import AcquisitionsIcon from "./../shared/icons/acquisitions.svg";
import WorkIcon from "./../shared/icons/work.svg";

const Wrap = styled.form`
  display: grid;
  grid-gap: 4vw;
  grid-template: auto / 1fr 45rem 1fr;
  padding: calc(2rem + 4vw);
`;

const FormHeadline = styled(Title)`
  text-align: right;
`;

const Fields = styled.div`
  width: 100%;
`;

const categories = [
  { label: "Essentials", icon: EssentialsIcon },
  { label: "Lifestyle", icon: LifestyleIcon },
  { label: "Luxuries", icon: LuxuriesIcon },
  { label: "Acquisitions", icon: AcquisitionsIcon },
  { label: "Work", icon: WorkIcon },
];

export const NewExpenseView = ({ props }) => {
  const [expense, setExpense] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("Essentials");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [shared, setShared] = useState(0.5);
  const [notes, setNotes] = useState("");

  return (
    <Wrap>
      <FormHeadline>New Expense</FormHeadline>
      <Fields>
        <ExpenseField
          onExpenseChange={setExpense}
          onCurrencyChange={setCurrency}
          currency={currency}
          expense={expense}
        />

        <CategoryField
          onChange={setCategory}
          categories={categories}
          selected={category}
        />

        <NameField name={name} onChange={setName} />

        <DateField date={date} onChange={setDate} />

        <GroupField onChange={setShared} />

        <NotesField notes={notes} onChange={setNotes} />
      </Fields>
    </Wrap>
  );
};
