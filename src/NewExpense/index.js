import React, { useState, useRef, useEffect } from "react";
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
import { Form } from "./Form";

import { ReactComponent as EssentialsIcon } from "./../shared/icons/essentials.svg";
import { ReactComponent as LifestyleIcon } from "./../shared/icons/lifestyle.svg";
import { ReactComponent as LuxuriesIcon } from "./../shared/icons/luxuries.svg";
import { ReactComponent as AcquisitionsIcon } from "./../shared/icons/acquisitions.svg";
import { ReactComponent as WorkIcon } from "./../shared/icons/work.svg";

const FormWrap = styled.form`
  display: grid;
  grid-gap: 4vw;
  justify-content: center;
  padding: calc(2rem + 4vw) 1rem;

  @media only screen and (min-width: 64em) {
    grid-template-columns: auto 1fr;
    justify-content: start;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (min-width: 87.5em) {
    grid-template-columns: 1fr 45rem 1fr;
  }

  @media only screen and (orientation: landscape) and (min-width: 87.5em) {
    padding-bottom: 50vh;
    padding-top: 50vh;
  }
`;

const FormHeadline = styled(Title)`
  align-self: start;
  line-height: 1;
  margin: 2.25rem 0 0;
  text-align: center;

  @media only screen and (min-width: 64em) {
    position: sticky;
    top: 45vh;
    transform: translateY(-50%);
    text-align: right;
  }
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

  const requestDelay = 400;

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);
  const [optionalLoading, setOptionalLoading] = useState({});
  const [optionalSuccesses, setOptionalSuccesses] = useState({});

  let requiredTimeout = useRef(null);
  let extraTimeout = useRef(null);

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
    name: name,
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

  useEffect(() => {
    setOptionalSuccesses({
      date: false,
      sharing: false,
      notes: false,
    });
  }, []);

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

  const handleUpdate = (inputId) => {
    const id = 33;
    window.clearTimeout(extraTimeout.current);

    if (id) {
      setOptionalLoading({ ...optionalSuccesses, [inputId]: true });
      setOptionalSuccesses({ ...optionalSuccesses, [inputId]: false });

      extraTimeout.current = window.setTimeout(() => {
        api
          .put(`/expenses/${id}`, getBody())
          .then((res) => {
            setOptionalLoading({ ...optionalSuccesses, [inputId]: false });
            setOptionalSuccesses({ ...optionalSuccesses, [inputId]: true });
          })
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
    <FormWrap ref={formRef}>
      <div>
        <FormHeadline>New Expense</FormHeadline>
      </div>
      <Form>
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
            window.clearInterval(requiredTimeout.current);
            requiredTimeout.current = window.setTimeout(
              handleSubmit,
              requestDelay
            );
          }}
          success={success}
        />

        <StatusField
          isLoading={!id && isLoading && !success}
          success={success}
          error={!id && error}
          disabled
        />

        <DateField
          date={date}
          onChange={(value) => {
            setDate(value);
            handleUpdate("date");
          }}
          success={optionalSuccesses["date"]}
          loading={optionalLoading["date"]}
        />

        <GroupField
          sharing={sharing}
          onChange={(value) => {
            sharing = parseFloat(value);
            handleUpdate("sharing");
          }}
          success={optionalSuccesses["sharing"]}
          loading={optionalLoading["sharing"]}
        />

        <NotesField
          notes={notes}
          onChange={(value) => {
            notes = value;
            handleUpdate("notes");
          }}
          success={optionalSuccesses["notes"]}
          loading={optionalLoading["notes"]}
        />

        <ButtonWrap>
          <Button type="button" onClick={handleDelete} danger alignCenter>
            Scratch all that
          </Button>
        </ButtonWrap>
      </Form>
    </FormWrap>
  );
};
