import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Card } from "./../../shared";

import { CategoryItem } from "./../CategoryItem";

const Row = styled.div`
  margin: -0.5rem;
`

export const CategoryField = ({ categories, selected, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);

  useEffect(() => {
    setSelectedCategory(selected);
  }, [selected]);

  return (
    <Row>
      <Card pure>
        {categories.map((category) => (
          <CategoryItem
            name="category"
            id={`cat-${category.label.toLowerCase()}`}
            checked={
              selectedCategory &&
              selectedCategory.toUpperCase() === category.label.toUpperCase()
            }
            onChange={() => {
              setSelectedCategory(category.label);
              onChange(category.label);
            }}
            label={category.label}
            icon={category.icon}
            key={category.label}
          />
        ))}
      </Card>
    </Row>
  );
};
