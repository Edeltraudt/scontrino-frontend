import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button } from "./../../shared";

import * as time from "./../../utility/time";

import { ReactComponent as ArrowLeftIcon } from "./../../shared/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "./../../shared/icons/arrow-right.svg";

const Wrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1.125rem 0 0;
  position: relative;
  width: 100%;
`;

const Value = styled.strong`
  font-size: 2rem;
  font-weight: 400;
  flex: 1;
  margin: 0 1.5rem 0.125em;
`;

const RelativeValue = styled.span`
  font-weight: 500;
  margin-right: 0.25em;
`;

const ArrowButton = styled(Button)`
  font-size: 0.9rem;
  padding-left: 1.5em;
  padding-right: 1.5em;
`

const ArrowIcon = styled.span`
  display: flex;
  height: 0.875rem;
  width: 1.125rem;

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const Datepicker = ({ id, onChange, ...props }) => {
  const [date, setDate] = useState(props.date);

  const modifyDate = (seconds) => {
    const newDate = new Date(+date + seconds);
    setDate(newDate);
    onChange(newDate);
  };

  const handlePreviousDayClick = (e) => {
    modifyDate(time.day * -1);
  };

  const handleNextDayClick = (e) => {
    modifyDate(time.day);
  };

  useEffect(() => {
    setDate(props.date);
  }, [props.date])

  return (
    <Wrap>
      <ArrowButton
        type="button"
        onClick={handlePreviousDayClick}
        aria-label="Select previous day"
      >
        <ArrowIcon>
          <ArrowLeftIcon />
        </ArrowIcon>
      </ArrowButton>

      <Value>
        <RelativeValue>{time.getRelativeDateString(date)},</RelativeValue>
        {time.getDateString(date)}
      </Value>

      <ArrowButton
        type="button"
        onClick={handleNextDayClick}
        disabled={time.isToday(date)}
        aria-label="Select next day"
      >
        <ArrowIcon>
          <ArrowRightIcon />
        </ArrowIcon>
      </ArrowButton>
    </Wrap>
  );
};
