import React, { useState } from "react";
import Cart from "./Cart";
import InfoRoom from "./InfoRoom";
import { ModalPutRoom } from "@components/Modal";
import MainBodySkeleton from './MainBodySkeleton';
import InfoRoomSkeleton from "./infoRoomSkeleto";
const index = () => {
  return (
    <>
      <div className="w-full h-fit rounded-lg p-6 gap-8 nthd_flex_between drop-shadow-xl shadow-lg">
        {/* <MainBodySkeleton />
        <InfoRoomSkeleton /> */}
        <Cart />
        <InfoRoom />
        
      </div>
    </>
  );
};

export default index;
