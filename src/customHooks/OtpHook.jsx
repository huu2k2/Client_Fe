import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export const setUpRecaptcha = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    }
  );
};

// Send OTP to the provided phone number
export const sendOtp = async (phoneNumber) => {
  const phoneNumberWithCountryCode = `+84${phoneNumber}`;
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier);
    // Save confirmationResult to the window object for later use
    window.confirmationResult = confirmationResult;
   alert('send otp')
    return true
  } catch (error) {
    alert('not send otp')
    // Handle any errors that occur
    console.log("OTP ERROR: " + error.message);
    return false
  }
};

//
export const OTPContext = createContext();

const OtpHook = ({ children }) => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  // Initialize reCAPTCHA when the component mounts
  useEffect(() => {
    setUpRecaptcha();
    setIsRecaptchaReady(true);
  }, []);
  return (
    <OTPContext.Provider
      value={{
        sendOtp,
        isRecaptchaReady,
      }}
    >
      {children}
    </OTPContext.Provider>
  );
};

export default OtpHook;
export const useOTP = () => {
  return useContext(OTPContext);
};
