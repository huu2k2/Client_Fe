import { useState } from "react";
import img from "@assets/Login_img.png";
import backImg from "@assets/arrow_back_ios.png";
import LogoImg from "@assets/Logo.png";

import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const index = () => {
  const { pathname } = location;
  const change = useNavigate();

  return (
    <div className="w-full h-full nthd_flex relative self-stretch flex-1">
      <div className="h-screen w-[1344px]">
        <img src={img} alt="Login img" className="w-full h-fit" />
      </div>

 

      <div className="w-[576px] h-screen flex items-center justify-start flex-col py-[76px] px-[6rem] gap-8">
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
