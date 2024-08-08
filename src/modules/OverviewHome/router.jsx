import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";
import ListRooms from "./ListRooms";
import Policies from "./Policies";
import Deposit from "./Deposit";
import Booking from "./Booking";
import ServicesContextHook from "@customhooks/ServicesCustomHook";
import { ShowModalHook } from "../../customHooks";
const Page = lazy(() => import("./index"));
const router = {
  path: "/overview/:idHome",
  element: (
    <LazyWrapper>
      <ServicesContextHook>
        <Page />
      </ServicesContextHook>
    </LazyWrapper>
  ),
  children: [
    {
      path: "",
      element:<ShowModalHook> <ListRooms /></ShowModalHook>,
       
    },
    {
      path: "policies",
      element: <Policies />,
    },
    {
      path: "deposit/:idRoom",
      element: <Deposit />,
    },
    {
      path: "booking/:idRoom",
      element: <Booking />,
    },
  ],
};

export default router;
