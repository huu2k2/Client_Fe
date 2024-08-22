import img from "@assets/Login_img.png";
import LogoImg from "@assets/Logo.png";
import {Helmet} from "react-helmet";
import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
  const { pathname } = location;
  const change = useNavigate();
  const isOtp = pathname.includes("otp");
  const isForget = pathname.includes("forgot_password");
  const isResetPassword = pathname.includes("reset_password");

  // const handleBack = () => {
  //   change("");
  // };

  // const handleBackOtp = () => {
  //   change("forgot_password");
  // };

  // const handleBacktoOtp = () => {
  //   change("otp");
  // };
const hanldeClick =()=>{
  change('/')
}
  return (
    <div className="w-full h-screen nthd_flex relative self-stretch flex-1">
     <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập trang web dịch vụ mô giới số 1 Việt Nam" />
    </Helmet>

      {/* xac thuc opt */}
      <div id="recaptcha-container" ></div>
      <div className=" hidden lg:basis-7/10 lg:h-screen xl:block grow shrink" >
        <img src={img} alt="Login img" className="hidden lg:w-full lg:block h-full " />
      </div>

      <div className="basic-full lg:basis-3/10  h-screen grow shrink-0 flex items-center justify-center lg:justify-start flex-col py-[76px] px-[6rem] gap-8">
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
            {isOtp && <p>+84 {sessionStorage.getItem('number')?.slice(1)}</p>}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Index;
