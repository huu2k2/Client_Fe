import React, { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageLogin = lazy(() => import("./index"));
const FormLogin = lazy(() => import("./FormLogin"));
const ForgetPassword = lazy(() => import("./ForgetPassword"));
const Otp = lazy(() => import("./Otp"));
const ResetPassword = lazy(() => import("./ResetPassword"));

const router = {
  path: "/login",
  element: (
    <LazyWrapper>
      <PageLogin />
    </LazyWrapper>
  ),
  children: [
    {
      path: "",
      element: <FormLogin />,
    },
    {
      path: "forgot_password",
      element: <ForgetPassword />,
    },
    {
      path: "otp",
      element: <Otp />,
    },
    {
      path: "reset_password",
      element: <ResetPassword />,
    },
  ],
};

export default router;
