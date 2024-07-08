import React, { useState } from "react";
import { useParams } from "react-router-dom";
 
const InputComponent = ({
  title,
  type,
  name,
  suffix,
  bgColor,
  errors,
  register,
}) => {
  const error = errors[name];

  const [inputValue, setInputValue] = useState('');

  const {idRoom} = useParams()
  // Hàm xử lý thay đổi giá trị của input
  const handleInputChange = (e) => {
    let value = e.target.value;
    // Xóa dấu chấm và chuyển đổi thành số để loại bỏ các ký tự không phải số
    value = value.replace(/\./g, '');

    if (suffix || name ==='deposit') {
      // Định dạng lại giá trị nhập vào với dấu chấm (ngăn cách hàng nghìn)
      value = new Intl.NumberFormat("vi-VN").format(value);
    }

    setInputValue(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-6">
        <div
          className={`w-[411px] text-sm font-medium leading-tight text-gray-700`}
        >
          {title}
        </div>
        <div
          className={`h-[38px] px-[13px]   ${
            bgColor || "bg-white"
          } rounded-md shadow border flex items-center w-80 ${
            error ? "border-red-600 border-2" : "border-gray-300"
          }`}
        >
          <input
            type={type}
            {...register(name)} // Đăng ký trường với react-hook-form
            className={`w-full h-full text-sm font-normal leading-tight outline-none ${
              bgColor ? "bg-neutral-100 " : ""
            } ${error ? "text-red-600" : ""}`}
            placeholder={suffix ? `Nhập ${title}` : title}
            value={name ==='roomId' ?idRoom:inputValue}
             
            onChange={handleInputChange}
            // disabled={bgColor ?true:false}
          />
          {suffix && (
            <div
              className={`text-sm font-normal leading-tight ml-2 ${
                error ? "text-red-600" : "text-gray-500"
              }`}
            >
              {suffix}
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-600 text-sm">
          {error.message || "Trường này là bắt buộc"}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
