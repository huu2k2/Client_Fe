import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOTP } from "@customhooks";
import { usePostSendOtpMutation } from "../../apis/slice/Acount";
const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("email is required"),
  })
  .required();
const ForgetPassword = () => {
  const change = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 
  const [isLoading, setLoading] = useState(false);
  const [postSendOtp,{errors:Err}] = usePostSendOtpMutation()
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      const kq =postSendOtp({email:data.email}).unwrap()
     
      sessionStorage.setItem("remainingTime", 60);
      setTimeout(() => {
        sessionStorage.setItem("email", data.email);
        setLoading(false);
        change("/login/otp");
      }, 2000);
    } catch (error) {

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center space-y-4 w-full gap-6 "
    >
      {/* Phone number */}

      <div className="w-10/12 lg:w-[384px] gap-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center w-full h-full">
            <span className="loading loading-spinner loading-lg  bg-slate-500 "></span>
          </div>
        )}
        <label htmlFor="email" className="text-gray-700 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="Nhập email"
          {...register("email")}
          className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full "
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-10/12 lg:w-[384px] flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
      >
        Xác nhận
      </button>
 
    </form>
  );
};

export default ForgetPassword;
