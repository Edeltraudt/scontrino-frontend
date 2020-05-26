import React, { useState } from "react";
import styled from "styled-components";

import { Title, Button } from "./../shared";

import api from "./../utility/api";

import {
  CategoryField,
  DateField,
  ExpenseField,
  GroupField,
  NameField,
  NotesField,
  StatusField,
} from "./Fields";

import { ReactComponent as EssentialsIcon } from "./../shared/icons/essentials.svg";
import { ReactComponent as LifestyleIcon } from "./../shared/icons/lifestyle.svg";
import { ReactComponent as LuxuriesIcon } from "./../shared/icons/luxuries.svg";
import { ReactComponent as AcquisitionsIcon } from "./../shared/icons/acquisitions.svg";
import { ReactComponent as WorkIcon } from "./../shared/icons/work.svg";

const FormWrap = styled.form`
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const categories = [
  { label: "Essentials", icon: <EssentialsIcon /> },
  { label: "Lifestyle", icon: <LifestyleIcon /> },
  { label: "Luxuries", icon: <LuxuriesIcon /> },
  { label: "Acquisitions", icon: <AcquisitionsIcon /> },
  { label: "Work", icon: <WorkIcon /> },
];

export const NewExpenseView = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  let id = null;
  let cost = 0.0;
  let currency = "EUR";
  let category = categories[0].label;
  let name = "";

  let date = new Date();
  let shared = 0.0;
  let notes = "";

  const handleSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    setIsLoading(true);
    setSuccess(false);
    setError("");

    api
      .post("/expenses", {
        cost,
        currency,
        category: category.toLowerCase(),
        name,
        date: date.toISOString().slice(0, 10),
        sharing: parseFloat(shared),
        notes,
      })
      .then((res) => {
        setIsLoading(false);
        id = res.data.id;
      })
      .catch((res) => {
        setIsLoading(false);
        setError(res.error || "An unknown error occurred.")
      });
  };

  return (
    <FormWrap onSubmit={handleSubmit}>
      <FormHeadline>New Expense</FormHeadline>
      <Fields>
        <ExpenseField
          onExpenseChange={(value) => {
            cost = value;
          }}
          onCurrencyChange={(value) => {
            currency = value;
          }}
          currency={currency}
          expense={cost}
        />

        <CategoryField
          onChange={(value) => {
            category = value.toLowerCase();
          }}
          categories={categories}
          selected={category}
        />

        <NameField
          name={name}
          onChange={(value) => {
            name = value;
          }}
        />

        <StatusField
          isLoading={!id && isLoading}
          success={success}
          error={error}
        />

        <DateField
          date={date}
          onChange={(value) => {
            date = value;
          }}
        />

        <GroupField
          shared={shared}
          onChange={(value) => {
            shared = value;
          }}
        />

        <NotesField
          notes={notes}
          onChange={(value) => {
            notes = value;
          }}
        />

        <ButtonWrap>
          <Button type="submit" primary alignCenter>
            Save
          </Button>
          <Button type="button" danger alignCenter>
            Scratch all that
          </Button>
        </ButtonWrap>
      </Fields>
    </FormWrap>
  );
};
