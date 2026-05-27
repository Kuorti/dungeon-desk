import * as React from "react";
import { NumericInputProps } from "@src/shared/ui/numeric-input/index.ts";

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyDigits = inputValue.replace(/\D/g, "");

    if (onlyDigits === "") {
      onChange(min);
      return;
    }

    const num = parseInt(onlyDigits, 10);

    if (num < min || num > max) {
      return;
    }

    onChange(num);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default NumericInput;
