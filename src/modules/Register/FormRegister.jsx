import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@components/CustomLoading/LoadingSpinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usePostRegisterMutation } from "@apis/slice/Acount";
const schema = yup
  .object({
    fullName: yup.string().min(10, "fullName must be exactly 10 digits"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(16, "password must be at most 16 characters")
      .required("password is required"),
    isCheckbox: yup.boolean().required(),
  })
  .required();

const FormRegister = () => {
  const change = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [postRegister, { isLoading, isError, isSuccess, error }] =
    usePostRegisterMutation();
  const [isHaveCheckBox, setIsHaveCheckBox] = useState(false);

  const onSubmit = async (data) => {
    if (data.isCheckbox) {
      setIsHaveCheckBox(false);
      const { isCheckbox, ...Data } = data; // Ensure isCheckbox is extracted first
      const response = await postRegister(Data).unwrap();

      if (response.isSuccess) {
        change("/login");
      }
    } else {
      setIsHaveCheckBox(true);
    }
  };

  const [isHide, setIsHide] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full gap-6 "
      >
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
        {/* fullName */}
        <div className="w-10/12 lg:w-[384px] gap-1">
          <label
            htmlFor="fullName"
            className="text-gray-700 text-sm font-medium"
          >
            Họ và tên
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>
        {/* Phone number */}
        <div className="w-10/12 lg:w-[384px] gap-1">
          <label htmlFor="phone" className="text-gray-700 text-sm font-medium">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="text"
             placeholder="Nhập số điện thoại"
            {...register("phone")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        {/* Email */}
        <div className="w-10/12 lg:w-[384px] gap-1">
          <label htmlFor="email" className="text-gray-700 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="client@gmail.com"
            {...register("email")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        {/* password */}
        <div className="w-10/12 lg:w-[384px]">
          <div className="relative ">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type={!isHide ? "password" : "text"}
              placeholder=""
              {...register("password")}
              className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
            />
            <span
              className="absolute bottom-3 right-2"
              onClick={() => setIsHide(!isHide)}
            >
              {!isHide ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* check box */}
        <div className="flex justify-between items-center w-10/12 lg:w-[384px]">
          <div className="flex items-start justify-between gap-2">
            <input
              id="isCheckbox"
              type="checkbox"
              {...register("isCheckbox")}
              className="mt-1"
            />
            <label
              htmlFor="isCheckbox"
              className={` text-gray-900 text-sm font-medium  leading-5`}
            >
              Bằng việc Đăng ký, bạn đã đọc và đồng ý với
              <Link to={"/"} className="text-red-600">
                {" "}
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link to={"/"} className="text-red-600">
                Chính sách bảo mật
              </Link>{" "}
              của Aloper
            </label>
          </div>
        </div>

        {isHaveCheckBox && (
          <div className="text-red-500 mt-2 flex justify-center items-center">
            <span>Bạn chưa đồng ý với các điều khoản sử dụng</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 mt-2 flex justify-center items-center">
            <span>Số điện thoại này đã được đăng kí!</span>
          </div>
        )}
        <button
          type="submit"
          className="w-10/12 lg:w-[384px] flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
        >
          Đăng ký
        </button>
        <div className="h-fit text-base  font-normal w-full flex justify-center items-center gap-1">
          <span className="font-normal">Đã có tài khoản? </span>{" "}
          <Link to={"/login"} className="font-bold text-red-700">
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
