import React from "react";
import styled, { keyframes } from "styled-components";

import { colors } from "./../../theme";
import { Message, Card, Loader } from "./../../shared";

const Wrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 3.75rem;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const StatusLoader = styled(Loader)`
  font-size: 1rem;
  position: absolute;
`;

const FillerLine = styled.span`
  border-left: 1px solid ${colors.border};
  bottom: -1rem;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: -0.75rem;
  transition: 0.15s ease opacity;

  ${({active}) => active && `opacity: 1`}
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const MessageWrap = styled.div`
  animation: ${fadeIn} 0.25s ease forwards;
  opacity: 0;
`;

export const StatusField = ({
  isLoading,
  success,
  error,
  onChange,
  ...props
}) => {
  return (
    <Card pure chained>
      <Wrap>
        <StatusLoader active={isLoading} />

        <FillerLine active={!isLoading && !success && error === ""} />

        {!isLoading && success && (
          <MessageWrap>
            <Message focus centered>
              Saved!
            </Message>
            <Message centered>
              You can either ditch or adjust some details below.
            </Message>
          </MessageWrap>
        )}

        {!isLoading && error !== "" && (
          <MessageWrap>
            <Message centered danger>
              {error}
            </Message>
          </MessageWrap>
        )}
      </Wrap>
    </Card>
  );
};
