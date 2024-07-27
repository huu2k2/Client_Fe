import React, { useEffect, useState } from "react";
import { convertToDateISOString } from "@utils/ConverDate"; // Đảm bảo đường dẫn import phù hợp với dự án của bạn

const InputFiel = ({
  name,
  label,
  type,
  isEnable = false,
  setFormData,
  variable,
  disabled
}) => {
  const [value, setValue] = useState(label); // Sử dụng label như giá trị ban đầu cho input

  // Đảm bảo cập nhật value khi label thay đổi
  useEffect(() => {
    setValue(label);
  }, [label]);

  // Update formData khi value thay đổi
  useEffect(() => {
    if (type === "date" && value !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [variable]: convertToDateISOString(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [variable]: value,
      }));
    }
  }, [value, type, variable, setFormData]);

  // Xử lý sự kiện thay đổi giá trị của input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-sm font-medium text-gray-900">{name}</span>
      <input
        isEnable
        type={type}
        value={value || ""} // Đảm bảo value không bị undefined
        className="w-[312px] h-[38px] px-[13px] py-[9px] border-2 rounded-md"
        disabled={isEnable}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFiel;
