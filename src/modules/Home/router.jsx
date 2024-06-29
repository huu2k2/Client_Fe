import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageHomeMain = lazy(() => import("./index"));
import PageHomeDetail from "./HomePage_Detail";
import HomePage from "./HomePage";
import { ShowModalHook } from "@customhooks";
import ServicesContextHook from "@customhooks/ServicesCustomHook";
import PageHomeManagement from './ListRoomsLike'
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
      path: "similarRooms?*",
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
    {
      path:'/danh_sach_phong_yeu_thich',
      element: <PageHomeManagement />,
    },
  ],
};

export default router;
