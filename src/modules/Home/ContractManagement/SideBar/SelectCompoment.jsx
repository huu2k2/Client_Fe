import React, { useState } from 'react';
import Select from 'react-select';
 
const options = [
  { value: 'new', label: 'Mới' },
  { value: 'old', label: 'Cũ' }
];

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState({ value: 'new', label: 'Mới' });

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
     
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="w-full"
        classNamePrefix="select"
        isClearable
        placeholder="Chọn tình trạng"
      />
      
  
  );
};

export default SelectComponent;
