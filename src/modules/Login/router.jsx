import PageLogin from "./index";
import FormLogin from "./FormLogin";
import ForgetPassword from "./ForgetPassword";
import Otp from "./Otp";
import ResetPassword from "./ResetPassword";

const router = {
  path: "/login",
  element: <PageLogin />,
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
