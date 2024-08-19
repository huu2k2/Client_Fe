import React, { useRef } from "react";

import { useGetImagesQuery } from "../../../apis/slice/ImageOfRoom";
import ListImg from "./ListImg";
import { Link } from "react-router-dom";
import { ModalPutRoom } from "@components/Modal";
import { useBooleanIsShowModal } from "@customhooks";
const ContainerImg = ({ item, data }) => {
  const [isShowModal, setIsShowModal, dropdownRef] = useBooleanIsShowModal();
  const refDialog = useRef(null);
  const { data: images } = useGetImagesQuery(item.roomId);
  const handleClick = () => {
    document.getElementById("my_modal_showimg").close();
    setIsShowModal(!isShowModal);
  };
  const handleCheckOutSide = (event) => {
    if (refDialog.current && !refDialog.current.contains(event.target)) {
      document.getElementById("my_modal_showimg").close();
    }
  };
  return (
    <>
      <dialog
        id="my_modal_showimg"
        className="modal my-5 "
        onClick={handleCheckOutSide}
      >
        <div className="modal-box w-11/12 max-w-7xl h-fit" ref={refDialog}>
          <h3 className="font-bold text-lg">Phòng P.{item.roomCode}</h3>
          <p className="py-4">
            Giá: {Intl.NumberFormat("vi-VN").format(item?.price)} VNĐ
          </p>

          <ListImg images={images} />

          <div className="modal-action  h-fit flex justify-end items-center gap-2">
            {data.status !== "2" ? (
              <button
                className="btn bg-rose-600 text-white hover:bg-rose-500"
                onClick={handleClick}
              >
                Đặt lịch xem phòng
              </button>
            ) : (
              <></>
            )}

            <Link
              to={"/quan_ly_lich_hen"}
              className="btn bg-rose-600 text-white hover:bg-rose-500"
            >
              Đặt cọc
            </Link>
          </div>
        </div>
      </dialog>

      {isShowModal && (
        <ModalPutRoom
          dropdownRef={dropdownRef}
          setIsShowModal={setIsShowModal}
          roomId={item.roomCode}
          id={item.houseId}
        />
      )}
    </>
  );
};

export default ContainerImg;
