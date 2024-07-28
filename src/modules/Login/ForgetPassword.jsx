import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOTP } from "@customhooks";
import { usePostCheckPasswordMutation } from "../../apis/slice/Acount";

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

  const { sendOtp, isRecaptchaReady } = useOTP();
  const [isLoading, setLoading] = useState(false);
  const [postCheckPassword, { error }] = usePostCheckPasswordMutation();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.email.length === 10) {
        const result = await postCheckPassword({
          email: data.email,
        }).unwrap();
        localStorage.setItem("remainingTime", 60);

        if (result.isSuccess && isRecaptchaReady) {
          const rs = await sendOtp(data.email);
          if (rs) {
            setTimeout(() => {
              localStorage.setItem("number", data.email);
              setLoading(false);
              change("/login/otp");
            }, 2000);
          }
        } else {
          alert("reCAPTCHA is not ready yet.");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full gap-6 "
    >
      {/* Phone number */}

      <div className="w-[384px] gap-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center w-full h-full">
            <span className="loading loading-spinner loading-lg  bg-slate-500 "></span>
          </div>
        )}
        <label
          htmlFor="email"
          className="text-gray-700 text-sm font-medium"
        >
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
        className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
      >
        Xác nhận
      </button>
      <div id="recaptcha-container"></div>
    </form>
  );
};

export default ForgetPassword;
