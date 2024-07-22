import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";
import ListRooms from "./ListRooms";
import Policies from "./Policies";
import Deposit from "./Deposit";
import Booking from "./Booking";
import ServicesContextHook from "@customhooks/ServicesCustomHook";
import { ProtectedRoute } from "@customhooks/AuthGuardHook";
import AuthProvider from "../../customHooks/AuthGuardHook";
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
      element: <ListRooms />,
       
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
