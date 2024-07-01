import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "./Input";
import TextArea from "./TextArea";

export const ModalPutRoom = ({ dropdownRef, setIsShowModal }) => {
  const log = () => {
    console.log();
  }
  return (
    <div
      className={`w-screen h-screen flex  flex-col justify-center items-center fixed   bg-gray-500 bg-opacity-50   inset-0 z-50 `}
      ref={dropdownRef}
    >
      <div className="relative w-[1360px]  h-fit py-6 px-10 gap-5 bg-white rounded-lg shadow-custom flex flex-col justify-start">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsShowModal(false)}
        >
          <AiFillCloseCircle />
        </div>
        {/* title */}
        <div className="flex flex-col justify-start gap-1 self-stretch h-12">
          <span className="text-gray-900 text-lg leading-6 font-medium">
            Nhà trọ 123 Lê Hoàng Phái
          </span>
          <span className="text-gray-500 font-normal text-sm leading-5">
            123 Lê Hoàng Phái, Phường 12, Gò Vấp, Tp. Hồ Chí Minh
          </span>
        </div>
        <form className="w-[1280px] h-fit gap-8 flex flex-col justify-start ">
          <div className=" w-full h-fit gap-5 flex flex-col justify-start">

            <Input
              label={"Tên khách hàng"}
            />
            <Input
              label={"Thời gian xem phòng"}
              type={"date"} />
            <TextArea
              label={"Ghi chú"}

            />
          </div>

          <div className="mt-[7px]">
            <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
            <div className="flex justify-end mt-5 w-full h-[38px] ">
              <button
                onClick={log}
                className="flex justify-center items-center px-4 py-2 rounded-md bg-red-600 shadow-sm text-white text-sm font-medium leading-5">
                Đặt lịch
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
