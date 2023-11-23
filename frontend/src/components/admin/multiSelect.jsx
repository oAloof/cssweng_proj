import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import ErrorMessage from "../ErrorMessage";

/**
   @TODO: Implement logic to accept additional user input
   @TODO: Implement logic to retrieve user selections for backend and pass them to filters
**/

const MultiSelect = ({
  name,
  selectOptions,
  isUserInputAllowed = true,
  field,
  isMulti,
  error,
  setError,
}) => {
  const transformFieldValue = (value) => {
    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
      if (!string) return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // If value is a string, transform it into an object and return as a single element array
    if (typeof value === "string") {
      return [{ value, label: capitalizeFirstLetter(value) }];
    }

    // If value is an array, map each string to an object
    if (Array.isArray(value)) {
      return value.map((val) => ({
        value: val,
        label: capitalizeFirstLetter(val),
      }));
    }

    // If value is neither a string nor an array, return an empty array
    return [];
  };

  const [options, setOptions] = useState(selectOptions);
  const [selectedValues, setSelectedValues] = useState(
    transformFieldValue(field?.value) || []
  );

  const handleChange = (newValue, actionMeta) => {
    // Handle change in selection
    setSelectedValues(newValue);
    // Check if field is defined
    if (field && field.onChange) {
      field.onChange(newValue.map((item) => item.value));
    }

    if (error && setError) {
      setError(name, {
        type: "manual",
        message: "",
      });
    }
  };

  const handleCreate = (inputValue) => {
    if (!isUserInputAllowed) {
      return;
    }
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]); // Add new option to options list
    handleChange([...selectedValues, newOption], { action: "create-option" }); // Select the new option
  };

  return (
    <div className="container p-0 h-full w-full font-Nunito">
      <div className="flex flex-row justify-end">
        {error && <ErrorMessage message={error.message} />}
      </div>
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
};

export default MultiSelect;
