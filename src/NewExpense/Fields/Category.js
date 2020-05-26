import React, { useState } from "react";

import { Card } from "./../../shared";

// TODO: rename
import { Category } from "./../Category";

export const CategoryField = ({ categories, selected, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);

  return (
    <Card pure chained>
      {categories.map((category) => (
        <Category
          name="category"
          id={`cat-${category.label.toLowerCase()}`}
          checked={selectedCategory === category.label}
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
