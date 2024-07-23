import React from "react";

import { useGetImagesQuery } from "../../../apis/slice/ImageOfRoom";
import ListImg from "./ListImg";
const ContainerImg = ({ item ,data}) => {
  const { data: images } = useGetImagesQuery(item.roomId);
console.log("data",data)
  return (
    <dialog id="my_modal_showimg" className="modal my-5 ">
      <div className="modal-box w-11/12 max-w-7xl h-fit">
        <h3 className="font-bold text-lg">Phòng P.{item.roomCode}</h3>
        <p className="py-4">
          Giá: {Intl.NumberFormat("vi-VN").format(item?.price)} VNĐ
        </p>

        <ListImg images={images} />

        <div className="modal-action  h-fit flex justify-end items-center gap-2">
          <button className="btn bg-rose-600 text-white hover:bg-rose-500">
            Đặt lịch
          </button>
          <button className="btn bg-rose-600 text-white hover:bg-rose-500">
            Đặt cọc
          </button>

          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ContainerImg;
