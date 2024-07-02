import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOTP } from "../../customHooks/OtpHook";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const length = 6; // Định nghĩa biến length
  const refs = useRef(Array(length).fill(null));
  const [otp, setOtp] = useState(Array(length).fill(""));
  //  check path otp
  const { pathname } = location;
  const isRegister = pathname.includes("register/otp");
  // Lưu trữ tham chiếu đến các ô input vào mảng refs
  const handleRef = (ref, index) => {
    refs.current[index] = ref;
  };

  // Xử lý sự kiện khi người dùng nhập liệu vào ô input
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]*$/.test(value)) return; // Chỉ cho phép nhập số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    if (value.length === 0 && index > 0) {
      refs.current[index - 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      // Hàm onComplete có thể được định nghĩa hoặc bạn có thể xóa đoạn này nếu không cần
      // onComplete(newOtp.join(''));
    }
  };
  const [otpErr, setOtpErr] = useState(false);
  const handleSendOtp = () => {

    if (!window.confirmationResult) {
      alert("Confirmation result is not set. Please request an OTP first.");
      return;
    }
 
    console.log(otp.join(""));
    window.confirmationResult
      .confirm(otp.join(""))
      .then((result) => {
        console.log("ke qua", result);
        navigate("/login/reset_password");
      })
      .catch((error) => {
        alert(" loi , nhap sai otp");
      });
  };

  const getInitialTime = (path) => {
    const savedTime = localStorage.getItem("remainingTime");
    if (path === "/login/otp" && savedTime) {
      return parseInt(savedTime, 10); // Use saved time if on the correct path
    }
    return 60; // Default to 60 seconds if not on the correct path
  };

  const [seconds, setSeconds] = useState(() =>
    getInitialTime(location?.pathname)
  );
  // Save the remaining time to localStorage
  const tick = useCallback(() => {
    setSeconds((prevSeconds) => {
      const newSeconds = prevSeconds - 1;
      localStorage.setItem("remainingTime", newSeconds);
      return newSeconds;
    });
  }, []);

  useEffect(() => {
    // Clear localStorage if the timer reaches 0
    if (seconds <= 0) {
      localStorage.removeItem("remainingTime");
      return;
    }

    // Setup interval if seconds is positive
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer); // Cleanup interval on component unmount or seconds change
  }, [seconds, tick]);

  // Format seconds into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  // gui lai
  const { sendOtp, isRecaptchaReady } = useOTP();
  const hanldeSendAgaint = () => {
    if (seconds == 0) {
      localStorage.setItem("remainingTime", 60);
      setSeconds(60);
      if (isRecaptchaReady) {
        sendOtp(localStorage.getItem("number"));
      } else {
        alert("reCAPTCHA is not ready yet.");
      }
    }
  };
  return (
    <div className="flex flex-col space-y-4 w-full gap-6 text-center">
      {/* input otp */}
      <div className="w-[384px] h-[44px] flex justify-center items-center gap-3">
        {[...Array(length)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <input
              type="text"
              maxLength={1}
              value={otp[i]}
              className={`w-11 h-11 flex-shrink-0 rounded-md border bg-gray-50 text-center text-base font-normal leading-6 font-main border-gray-600`}
              placeholder="-"
              key={i}
              autoFocus={i === 0}
              onChange={(e) => handleChange(e, i)}
              ref={(ref) => handleRef(ref, i)}
            />
          </div>
        ))}
      </div>

      <span className="text-black text-sm font-medium leading-5">
        Mã sẽ hết hạn trong {formatTime(seconds)}
      </span>
      {otpErr && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-red-600 text-right text-sm font-medium leading-5 cursor-pointer">
            OTP INVALID!
          </p>
        </div>
      )}
      <button
        onClick={handleSendOtp}
        className="flex px-4 py-2 justify-center items-center rounded-md bg-red-600 shadow-sm text-white text-sm font-medium"
      >
        Xác thực
      </button>

      <div className="w-full flex flex-col justify-center items-center">
        <span className="text-gray-600 text-sm font-normal leading-5">
          Bạn không nhận được mã xác thực?
        </span>
        <button
          className="text-red-600 text-right text-sm font-medium leading-5 cursor-pointer"
          onClick={hanldeSendAgaint}
        >
          Gửi lại
        </button>
      </div>
      <div id="recaptcha-container" ></div>
    </div>
  );
};

export default Otp;
