import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { colors } from "./../theme";

const thumbSize = 1.5; // rem
const trackHeight = 3; // px

const track = (props) => `
  cursor: default;
  height: ${trackHeight}px;
  transition: all 0.2s ease;
`;

const thumb = (props) => `
  background: ${colors.primary};
  border: 0;
  border-radius: ${thumbSize}rem;
  cursor: default;
  height: ${thumbSize}rem;
  width: ${thumbSize}rem;
`;

const Wrap = styled.div`
  width: 100%;
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  background: transparent;
  outline: 0;
  overflow: hidden;
  margin-top: -${thumbSize / 2}rem;
  padding: ${thumbSize / 2}rem 0;
  position: relative;
  transition: 0.15s ease box-shadow;
  width: 100%;

  /* Webkit browsers */
  &::-webkit-slider-runnable-track {
    ${track};
    background: ${colors.border};
  }

  &::-webkit-slider-thumb {
    ${thumb};
    -webkit-appearance: none;
    margin-top: ${thumbSize * -0.5}rem;
  }

  &:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.primary)};
  }

  /* Firefox */
  &::-moz-focus-outer {
    border: 0;
  }

  &::-moz-range-track {
    ${track};
    background: ${colors.border};
    height: ${trackHeight}px;
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &:focus::-moz-range-thumb {
    box-shadow: 0 0 0 3px ${transparentize(0.5, colors.primary)};
  }
`;

const Label = styled.strong`
  color: ${colors.text};
  font-weight: 500;
`;

const ScaleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Scale = styled(ScaleWrap)`
  margin-bottom: 0.5rem;
  margin-top: -${thumbSize * 0.75}rem;
  padding: 0 ${thumbSize / 2}rem;
`;

const Line = styled.span`
  border-left: 1px solid ${colors.border};
  display: block;
  height: 0.25rem;

  &:nth-child(odd) {
    height: 0.5rem;
  }
`;

export const Range = ({ minLabel, maxLabel, onChange, ...props }) => {
  const lineArray = new Array((props.max - props.min) / props.step + 1).fill(1);

  return (
    <Wrap>
      <RangeInput
        type="range"
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <Scale>
        {lineArray.map((_, index) => (
          <Line key={index} />
        ))}
      </Scale>
      <ScaleWrap>
        <Label>{minLabel}</Label>
        <Label>{maxLabel}</Label>
      </ScaleWrap>
    </Wrap>
  );
};
