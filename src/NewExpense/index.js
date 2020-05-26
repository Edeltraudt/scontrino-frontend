import React, { useState, useRef } from "react";
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
  const formRef = useRef();

  const requestDelay = 750;

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);

  let requiredTimeout = null;
  let extraTimeout = null;

  const [cost, setCost] = useState("");
  const [category, setCategory] = useState(categories[0].label.toLowerCase());
  const [date, setDate] = useState(new Date());

  let currency = "EUR";
  let name = "";
  let sharing = parseFloat(0.01);
  let notes = "";

  const getBody = () => ({
    id,
    cost: parseFloat(cost / 100),
    currency,
    category,
    // TODO: remove string modifications once API allows non-lowercase
    name: name.toLowerCase().replace(" ", ""),
    date: date.toISOString().slice(0, 10),
    sharing,
    notes,
  });

  const clearValues = () => {
    setId(null);
    setCost("");
    setCategory(categories[0].label.toLowerCase());
    setDate(new Date());
  };

  const handleSuccess = (res) => {
    window.setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setId(res.data.data.id);
    }, 200);
  };

  const handleError = (res) => {
    setIsLoading(false);
    setError(res.error || "An unknown error occurred.");
  };

  const handleSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    setIsLoading(true);
    setSuccess(false);
    setError("");

    api
      .post("/expenses", getBody())
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleUpdate = () => {
    if (id) {
      window.clearTimeout(extraTimeout);
      extraTimeout = window.setTimeout(() => {
        api
          .patch(`/expenses/${id}`, getBody())
          .then(handleSuccess)
          .catch(handleError);
      }, requestDelay);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (id) {
      api
        .delete(`/expenses/${id}`)
        .then(handleSuccess)
        .catch(handleError);
    }

    formRef.current.reset();
    clearValues();
  };

  return (
    <FormWrap onSubmit={handleSubmit} ref={formRef}>
      <FormHeadline>New Expense</FormHeadline>
      <Fields>
        <ExpenseField
          onExpenseChange={(value) => {
            setCost(value);
          }}
          onCurrencyChange={(value) => {
            currency = value;
          }}
          currency={currency}
          expense={cost}
          success={success}
        />

        <CategoryField
          onChange={(value) => setCategory(value.toLowerCase())}
          categories={categories}
          selected={category}
        />

        <NameField
          name={name}
          onChange={(value) => {
            name = value;
            window.clearInterval(requiredTimeout);
            requiredTimeout = window.setTimeout(handleSubmit, requestDelay);
          }}
          success={success}
        />

        <StatusField
          isLoading={!id && isLoading && !success}
          success={success}
          error={!id && error}
        />

        {/* TODO: send patch-requests for each modification */}
        <DateField
          date={date}
          onChange={(value) => {
            setDate(value);
            handleUpdate();
          }}
        />

        <GroupField
          sharing={sharing}
          onChange={(value) => {
            sharing = parseFloat(value);
            handleUpdate();
          }}
        />

        <NotesField
          notes={notes}
          onChange={(value) => {
            notes = value;
            handleUpdate();
          }}
        />

        <ButtonWrap>
          <Button onClick={handleDelete} danger alignCenter>
            Scratch all that
          </Button>
        </ButtonWrap>
      </Fields>
    </FormWrap>
  );
};
