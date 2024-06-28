import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";
import ListRooms from './ListRooms'
import Policies from './Policies'
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
  ],
};

export default router;
