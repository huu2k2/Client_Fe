import PageLogin from "./index";
import FormLogin from "./FormLogin";
import ForgetPassword from "./ForgetPassword";
import Otp from "./Otp";
import ResetPassword from "./ResetPassword";
import OtpHook from "@customhooks/OtpHook";
const router = {
  path: "/login",
  element: (
    <OtpHook>
      <PageLogin />
    </OtpHook>
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
