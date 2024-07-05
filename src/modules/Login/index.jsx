import { useEffect, useState } from "react";
import img from "@assets/Login_img.png";
import backImg from "@assets/arrow_back_ios.png";
import LogoImg from "@assets/Logo.png";

import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
  const { pathname } = location;
  const change = useNavigate();
  const isOtp = pathname.includes("otp");
  const isForget = pathname.includes("forgot_password");
  const isResetPassword = pathname.includes("reset_password");

  const handleBack = () => {
    change("");
  };

  const handleBackOtp = () => {
    change("forgot_password");
  };

  const handleBacktoOtp = () => {
    change("otp");
  };
const hanldeClick =()=>{
  change('/')
}
  return (
    <div className="w-full h-full nthd_flex relative self-stretch flex-1">
      {/* {isForget && (
        <div
          className="absolute top-5 right-96 flex justify-center items-center"
          onClick={handleBack}
        >
          
          <img
            src={backImg}
            alt="icon back"
            className="cursor-pointer"
            id="iconBack"
          />
           
          
          <label
            htmlFor="iconBack"
            className="text-gray-700 text-base font-normal font-main leading-6"
          >
            Quay lại
          </label>
        </div>
      )}

      {isOtp && (
         <div
         className="absolute top-5 right-96 flex justify-center items-center"
         onClick={handleBackOtp}
       >
         
         <img
           src={backImg}
           alt="icon back"
           className="cursor-pointer"
           id="iconBack"
         />
          
         
         <label
           htmlFor="iconBack"
           className="text-gray-700 text-base font-normal font-main leading-6"
         >
           Quay lại
         </label>
       </div>
      )}

      {isResetPassword && (
          <div
          className="absolute top-5 right-96 flex justify-center items-center"
          onClick={handleBacktoOtp}
        >
          
          <img
            src={backImg}
            alt="icon back"
            className="cursor-pointer"
            id="iconBack"
          />
           
          
          <label
            htmlFor="iconBack"
            className="text-gray-700 text-base font-normal font-main leading-6"
          >
            Quay lại
          </label>
        </div>
      )} */}

      {/* xac thuc opt */}
      <div id="recaptcha-container"></div>
      <div className="h-screen w-[1344px] " >
        <img src={img} alt="Login img" className="w-full h-fit " />
      </div>

      <div className="w-[576px] h-screen flex items-center justify-start flex-col py-[76px] px-[6rem] gap-8">
        {/* logo */}
        <div className="w-full h-[7.5rem] flex flex-col justify-center items-center gap-8">
          <img src={LogoImg} alt="logo" className="h-6 w-[135px] cursor-pointer" onClick={hanldeClick}/>

          {/* text login */}
          <div className="text-center">
            <p className="text-gray-900 text-center text-3xl font-extrabold leading-9  ">
              {isResetPassword
                ? "Mật khẩu mới"
                : isOtp
                ? "Nhập mã xác thưc"
                : isForget
                ? "Quên mật khẩu"
                : "Đăng nhập"}
            </p>
            <span className="text-gray-600 text-sm font-normal leading-5 ">
              {isResetPassword
                ? "Vui lòng nhập mật khẩu mới từ đây"
                : isOtp
                ? "Chúng tôi sẽ gửi mã xác minh đến"
                : isForget
                ? "Vui lòng nhập số điện thoại đã đăng kí"
                : "Quản lý nhà trọ dễ dàng với Aloper"}
            </span>
            {isOtp && <p>+84 {localStorage.getItem('number')?.slice(1)}</p>}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Index;
