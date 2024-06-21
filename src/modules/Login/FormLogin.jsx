import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usePostLoginMutation } from "@apis/slice/Acount";
import LoadingSpinner from "@components/CustomLoading/LoadingSpinner";

const schema = yup
  .object({
    userName: yup
      .string()
      .min(6, "userName must be at least 6 characters")
      .max(18, "userName must be at most 18 characters")
      .required("userName is required"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(16, "password must be at most 16 characters")
      .required("password is required"),
    remeber: yup.boolean().required(),
  })
  .required();

const FormLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [postLogin, { isLoading, error, data }] = usePostLoginMutation();
  const onSubmit = async (data) => {
    const response = await postLogin(data);
    console.log(response);
    if (response.data.mesagge === "Đăng nhập thành công") {
      localStorage.setItem("token", response.data.token);
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectUrl);
      } else {
        navigate("/");
      }
    }
  };

  const handleClick = () => {
    navigate("forgot_password");
  };

  const [isHide, setIsHide] = useState(false);

  return (
    <div className=" w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6 relative"
      >
        {isLoading && <LoadingSpinner isLoading={isLoading} />}

        {/* userName */}
        <div className="w-[384px] gap-1">
          <label
            htmlFor="userName"
            className="text-gray-700 text-sm font-medium"
          >
            Tên đăng nhập
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Tên đăng nhập"
            {...register("userName")}
            className={`px-4 py-2 items-center rounded-md border ${
              error ? "border-red-300 text-red-300" : "border-gray-300"
            } bg-white shadow-sm w-full`}
          />
          {errors.userName && (
            <span className="text-red-500">
              Tên Đăng Nhập Dài Hơn 6 Kí tự !
            </span>
          )}
        </div>

        {/* password */}
        <div className="relative w-[384px] gap-1">
          <label
            htmlFor="password"
            className="text-gray-700 text-sm font-medium"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type={!isHide ? "password" : "text"}
            placeholder="Mật khẩu"
            {...register("password")}
            className={`px-4 py-2 items-center rounded-md border ${
              error ? "border-red-300 text-red-300" : "border-gray-300"
            } bg-white shadow-sm w-full`}
          />
          <span
            className="absolute bottom-3 right-2 cursor-pointer"
            onClick={() => setIsHide(!isHide)}
          >
            {!isHide ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
          {errors.password && (
            <span className="text-red-500"> Mật Khẩu Dài Hơn 6 Kí Tự !</span>
          )}
        </div>

        {/* check box */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              id="remeber"
              type="checkbox"
              {...register("remeber")}
              className=""
            />
            <label
              htmlFor="remeber"
              className="text-gray-900 text-sm font-normal"
            >
              Lưu tài khoản
            </label>
            {errors.remeber && (
              <span className="text-red-500">{errors.remeber.message}</span>
            )}
          </div>
          <div onClick={handleClick} className="cursor-pointer">
            <span className="text-red-600 text-right text-sm font-medium">
              Quên mật khẩu?
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
        >
          Đăng nhập
        </button>

        <div className="h-fit text-base font-normal w-full flex justify-center items-center">
          <span className="font-normal w-[147px] h-5">Chưa có tài khoản?</span>
          <Link
            to={"/register"}
            className="font-bold text-red-700 w-[177px] h-5"
          >
            Đăng kí tài khoản mới
          </Link>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mt-2 flex justify-center items-center">
          <span>Tên đăng nhập hoặc mật khẩu không chính xác!</span>
        </div>
      )}
    </div>
  );
};

export default FormLogin;
