import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const Page= lazy(() => import("./index"));
const router = {
  path: "/overview/:idHome",
  element: (
    <LazyWrapper>
      <Page />
    </LazyWrapper>
  ),
  children: [],
};

export default router;
