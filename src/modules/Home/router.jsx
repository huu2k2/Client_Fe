import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageHomeMain = lazy(() => import("./index"));
import PageHomeDetail from "./HomePage_Detail";
import HomePage from "./HomePage";
import { ShowModalHook } from "@customhooks";
import ServicesContextHook from "@customhooks/ServicesCustomHook";

const router = {
  path: "/",
  element: (
    <LazyWrapper>
      <ServicesContextHook>
      <PageHomeMain />
      </ServicesContextHook>
    </LazyWrapper>
  ),
  children: [
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "similarRooms/:idroom",
      element: <HomePage />,
    },
    {
      path: "detail/:id/room/:roomId",
      element: (
        <ShowModalHook>
          <PageHomeDetail />
        </ShowModalHook>
      ),
    },
  ],
};

export default router;
