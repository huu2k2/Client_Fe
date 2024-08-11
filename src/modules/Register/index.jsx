import { useState } from "react";
import img from "@assets/Login_img.png";
import LogoImg from "@assets/Logo.png";

import { Outlet } from "react-router-dom";
const index = () => {
  return (
    <div className="w-full h-screen nthd_flex relative self-stretch flex-1">
        <div className=" hidden lg:basis-7/10 lg:h-screen xl:block grow shrink" >
        <img src={img} alt="Login img" className="hidden lg:w-full lg:block h-full " />
      </div> 

      <div className="basic-full lg:basis-3/10 h-screen grow shrink flex items-center justify-center lg:justify-start flex-col py-[76px] px-[6rem] gap-8">
        <div className="w-full h-[7.5rem] flex flex-col justify-center items-center gap-8">
          <img src={LogoImg} alt="logo" className="h-6 w-[135px]" />

          <div className="text-center">
            <p className="text-gray-900 text-center text-3xl font-extrabold leading-9  ">
              Đăng kí tài khoản
            </p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default index;
