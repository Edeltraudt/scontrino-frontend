import React, { useState, useEffect } from "react";

import { Card } from "./../../shared";

// TODO: rename
import { Category } from "./../Category";

export const CategoryField = ({ categories, selected, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);

  useEffect(() => {
    setSelectedCategory(selected);
  }, [selected])

  return (
    <Card pure chained>
      {categories.map((category) => (
        <Category
          name="category"
          id={`cat-${category.label.toLowerCase()}`}
          checked={selectedCategory && selectedCategory.toUpperCase() === category.label.toUpperCase()}
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
  );
};
