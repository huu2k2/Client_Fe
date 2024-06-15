import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    PhoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
     
  })
  .required();
const ForgetPassword = () => {
  const change = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    
      const onSubmit = (data) => {
        if(data.PhoneNumber.length ===10){
          change('/login/otp')
        }
       
      };

     
    
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col space-y-4 w-full gap-6 "
  >
    {/* Phone number */}
    <div className="w-[384px] gap-1">
      <label
        htmlFor="PhoneNumber"
        className="text-gray-700 text-sm font-medium"
      >
        Số điện thoại
      </label>
      <input
        id="PhoneNumber"
        type="text"
        placeholder="Phone Number"
        {...register("PhoneNumber")}
        className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full "
      />
      {errors.PhoneNumber && (
        <span className="text-red-500">{errors.PhoneNumber.message}</span>
      )}
    </div>

    
    
    <button
      type="submit"
      className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
      
    >
      Xác nhận
    </button>
  </form>
  )
}

export default ForgetPassword