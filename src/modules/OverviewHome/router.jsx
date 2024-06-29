import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";
import ListRooms from './ListRooms'
import Policies from './Policies'
import Deposit from './Deposit'
import Booking from './Booking'
const Page= lazy(() => import("./index"));
const router = {
  path: "/overview/:idHome",
  element: (
    <LazyWrapper>
      <Page />
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
      path: "deposit",
      element: <Deposit />,
    },
    {
      path: "booking",
      element: <Booking />,
    },
  ],
};

export default router;
