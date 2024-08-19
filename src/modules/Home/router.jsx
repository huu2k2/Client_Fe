import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageHomeMain = lazy(() => import("./index"));
import PageHomeDetail from "./HomePage_Detail";
import HomePage from "./HomePage";
import { ShowModalHook, FilterCustomHook } from "@customhooks";
import ServicesContextHook from "@customhooks/ServicesCustomHook";
import PageHomeManagement from "./ListRoomsLike";
import PageCOntractManagement from "./ContractManagement";
import PageManageAppointments from "./ManageAppointments";
import { ManageAppointmentsHook } from "../../customHooks";
const router = {
  path: "/",
  element: (
    <LazyWrapper>
      <FilterCustomHook>
        <ServicesContextHook>
          <PageHomeMain />
        </ServicesContextHook>
      </FilterCustomHook>
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
      path: "/danh_sach_phong_yeu_thich",
      element: <PageHomeManagement />,
    },
    {
      path: "/quan_ly_hop_dong",
      element: (
        <ManageAppointmentsHook>
          <PageCOntractManagement />
        </ManageAppointmentsHook>
      ),
    },
    {
      path: "/quan_ly_lich_hen",
      element: (
        <ManageAppointmentsHook>
          <PageManageAppointments />
        </ManageAppointmentsHook>
      ),
    },
  ],
};

export default router;
