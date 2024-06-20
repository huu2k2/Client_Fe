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
        className="flex flex-col  w-full gap-6 "
      >
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
        {/* fullName */}
        <div className="w-[384px] gap-1">
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
        <div className="w-[384px] gap-1">
          <label htmlFor="phone" className="text-gray-700 text-sm font-medium">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="px-4 py-2 items-center rounded-md border border-gray-300 bg-white shadow-sm w-full"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>

        {/* password */}
        <div>
          <div className="relative">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type={!isHide ? "password" : "text"}
              placeholder="password"
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              id="isCheckbox"
              type="checkbox"
              {...register("isCheckbox")}
              className=""
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
          className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
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
