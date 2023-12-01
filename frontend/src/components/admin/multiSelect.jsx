import { useState, forwardRef } from "react";
import CreatableSelect from "react-select/creatable";
import ErrorMessage from "../ErrorMessage";

const MultiSelect = forwardRef(({
  onChange, // This is part of the 'field' object from react-hook-form
  value, // This is also part of the 'field' object from react-hook-form
  name,
  selectOptions,
  isUserInputAllowed = true,
  isMulti,
  error,
}, ref) => {
  const transformFieldValue = (value) => {
    const capitalizeFirstLetter = (string) => {
      if (!string) return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (typeof value === "string") {
      return [{ value, label: capitalizeFirstLetter(value) }];
    }

    if (Array.isArray(value)) {
      return value.map((val) => ({
        value: val,
        label: capitalizeFirstLetter(val),
      }));
    }

    return [];
  };

  // Initialize the selectedValues state from the field.value
  const [options, setOptions] = useState(selectOptions);
  const [selectedValues, setSelectedValues] = useState(
    transformFieldValue(value)
  );

  const handleChange = (newValue) => {
    // Update the internal state
    setSelectedValues(newValue);

    // Communicate the change to react-hook-form
    onChange(isMulti ? newValue.map((item) => item.value) : newValue?.value);
  };

  const handleCreate = (inputValue) => {
    if (!isUserInputAllowed) return;

    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setOptions((currentOptions) => [...currentOptions, newOption]);
    // Update the selected values state
    const updatedSelectedValues = isMulti
      ? [...selectedValues, newOption]
      : [newOption];
    setSelectedValues(updatedSelectedValues);
    // Communicate the change to react-hook-form
    field.onChange(updatedSelectedValues.map((item) => item.value));
  };

  return (
    <div className="container p-0 h-full w-full font-Nunito">
      {error && <ErrorMessage message={error.message} />}
      <CreatableSelect
        isMulti={isMulti}
        name={name}
        options={options}
        value={selectedValues}
        onChange={handleChange}
        onCreateOption={handleCreate}
        className="w-full h-full text-black focus:outline-none focus:ring-rose-300"
        classNamePrefix="select"
        placeholder={`Select ${name}`}
        isClearable
        isSearchable={isUserInputAllowed}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      />
    </div>
  );
});

export default MultiSelect;
