import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const PageHomeManagement = lazy(() => import("./index"));
const router = {
  path: "/management",
  element: (
    <LazyWrapper>
      <PageHomeManagement />
    </LazyWrapper>
  ),
  children: [],
};

export default router;
