import PageRegister from "./index";
import FormRegister from "./FormRegister";
import Otp from "../Login/Otp";

const router = {
  path: "/register",
  element: <PageRegister />,
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
