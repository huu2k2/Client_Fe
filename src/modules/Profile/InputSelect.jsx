import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetBankQuery } from "@apis/slice/Bank";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#D1D5DB", // Màu viền xám (gray-300)
    borderRadius: "6px", // Bo góc 6px
    padding: "2px", // Khoảng cách bên trong
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", // Shadow/sm
    "&:hover": {
      borderColor: "#D1D5DB", // Giữ nguyên màu viền khi hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "6px",
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", // Shadow/sm
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6B7280", // Màu xám (gray-700)
  }),
};

const InputSelect = ({ label, setFormData, variable }) => {
  const { data, isLoading } = useGetBankQuery();
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  // Xử lý khi dữ liệu đã có sẵn
  useEffect(() => {
    if (data?.data) {
      const formattedOptions = data.data.map((i) => ({
        value: i.id,
        label: i.name,
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  // Set initial selected option
  useEffect(() => {
    if (options.length > 0 && label) {
      const initialOption = options.find((option) => option.value === Number(label));
      setSelectedOption(initialOption);
    }
  }, [options, label]);

  // Handle onChange event
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [variable]: selectedOption.value.toString(),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [variable]: null,
      }));
    }
  };

  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-sm font-medium text-gray-900">Ngân hàng</span>
      <Select
        name="bank"
        styles={customStyles}
        className="w-[312px]"
        value={selectedOption}
        options={options}
        onChange={handleSelectChange}
        placeholder="Chọn ngân hàng"
        isLoading={isLoading}
      />
    </div>
  );
};

export default InputSelect;
