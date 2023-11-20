import { useState } from "react";
import CreatableSelect from "react-select/creatable";

/**
   @TODO: Implement logic to accept additional user input
   @TODO: Implement logic to retrieve user selections for backend and pass them to filters
**/

const MultiSelect = ({ name, selectOptions, isUserInputAllowed = true, field }) => {
  const [options, setOptions] = useState(selectOptions);
  const [selectedValues, setSelectedValues] = useState([]); // State for selected values

  const handleChange = (newValue, actionMeta) => {
    // Handle change in selection
    setSelectedValues(newValue);
    field.onChange(newValue.map(item => item.value)); // update form data
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
      <CreatableSelect
        isMulti
        name={name}
        options={options}
        value={selectedValues} // Set the selected values
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
