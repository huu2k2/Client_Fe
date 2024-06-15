import React, { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageRegister = lazy(() => import("./index"));
const FormRegister = lazy(() => import("./FormRegister"));
const Otp = lazy(() => import("../Login/Otp"));

const router = {
  path: "/register",
  element: (
    <LazyWrapper>
      <PageRegister />
    </LazyWrapper>
  ),
  children: [
    {
      path: "",
      element: <FormRegister />,
    },
    {
      path: "otp",
      element: <Otp />,
    },
  ],
};

export default router;
