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

import { ReactComponent as EssentialsIcon } from "./../shared/icons/essentials.svg";
import { ReactComponent as LifestyleIcon } from "./../shared/icons/lifestyle.svg";
import { ReactComponent as LuxuriesIcon } from "./../shared/icons/luxuries.svg";
import { ReactComponent as AcquisitionsIcon } from "./../shared/icons/acquisitions.svg";
import { ReactComponent as WorkIcon } from "./../shared/icons/work.svg";

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
  { label: "Essentials", icon: <EssentialsIcon /> },
  { label: "Lifestyle", icon: <LifestyleIcon /> },
  { label: "Luxuries", icon: <LuxuriesIcon /> },
  { label: "Acquisitions", icon: <AcquisitionsIcon /> },
  { label: "Work", icon: <WorkIcon /> },
];

export const NewExpenseView = ({ props }) => {
  const [expense, setExpense] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
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
          onExpenseChange={(value) => {
            console.log("Update expense to", value);
            setExpense(value);
          }}
          onCurrencyChange={setSelectedCurrency}
          currency={selectedCurrency}
          expense={expense}
        />

        <CategoryField
          onChange={setCategory}
          categories={categories}
          selected={category}
        />

        <NameField name={name} onChange={setName} />

        <DateField date={date} onChange={setDate} />

        <GroupField shared={shared} onChange={setShared} />

        <NotesField notes={notes} onChange={setNotes} />
      </Fields>
    </Wrap>
  );
};
