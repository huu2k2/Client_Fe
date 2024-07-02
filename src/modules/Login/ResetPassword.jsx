import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usePostResetPasswordMutation } from "../../apis/slice/Acount";

const schema = yup.object().shape({
  Password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
  Confirm_password: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const change = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [postResetPassword, { isLoading, error, data:Data }] = usePostResetPasswordMutation();
  const onSubmit = async(data) => {
    try {
      const query ={
        phoneNumber: localStorage.getItem('number'),
        newPassword: data.Password,
        confirmPassword: data.Confirm_password
      }
      const result = await postResetPassword(query).unwrap();

    // Kiểm tra nếu có lỗi trong phản hồi
    if (result.error) {
      throw new Error(result.error);
    }
      alert('Password reset request sent successfully.');
      change("/login");
    } catch (err) {
      console.error('Failed to send reset request:', err);
      alert('Failed to send password reset request.');
    }
  };
  const [isHide, setIsHide] = useState(false);
  const [isHideConfirm, setIsHideConfirm] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full gap-6 "
    >
      {/* Phone number */}
      <div>
        <div className="w-[384px] gap-1 relative">
          <label
            htmlFor="Password"
            className="text-gray-700 text-sm font-medium"
          >
            Mật khẩu mới
          </label>
          <input
            id="Password"
            type={!isHide ? "password" : "text"}
            placeholder="Phone Number"
            {...register("Password")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          <span
            className="absolute bottom-3 right-2"
            onClick={() => setIsHide(!isHide)}
          >
            {!isHide ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {errors.Password && (
          <span className="text-red-500">{errors.Password.message}</span>
        )}
      </div>

      {/* password */}
      <div>
        <div className="relative w-[384px] gap-1">
          <label
            htmlFor="Confirm_password"
            className="text-gray-700 text-sm font-medium"
          >
            Xác nhận lại mật khẩu mới
          </label>
          <input
            id="Confirm_password"
            type={!isHideConfirm ? "password" : "text"}
            placeholder="Password"
            {...register("Confirm_password")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          <span
            className="absolute bottom-3 right-2"
            onClick={() => setIsHideConfirm(!isHideConfirm)}
          >
            {!isHideConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {errors.Confirm_password && (
          <span className="text-red-500">
            {errors.Confirm_password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
      >
        Xác nhận
      </button>
    </form>
  );
};

export default ResetPassword;
