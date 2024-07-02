import MainBody from "./MainBody";

import Category from "./Category";
import RoomOrder from "./RoomOrder";
import { BsLightningCharge } from "react-icons/bs";
import { ModalPutRoom } from "@components/Modal";
import { useBooleanIsShowModal } from "@customhooks";

import { useParams } from 'react-router-dom';
import { useGetHolder, useGetInfoItem, useQueryFilterData, useSetIdRoomServices } from "../../../customHooks";
import { useEffect } from "react";
const index = () => {
  const [isShowModal, setIsShowModal, dropdownRef] = useBooleanIsShowModal();
  const { id, roomId } = useParams();
  const [setIsServices] = useSetIdRoomServices()
  console.log("🚀 ~ index ~ setIsServices:", setIsServices)
  const [address, price] = useGetInfoItem()
  useEffect(() => {
    setIsServices(roomId)
  }, [roomId])
  const [holder, rooms] = useGetHolder()

  return (
    <>
      {isShowModal && (
        <ModalPutRoom
          dropdownRef={dropdownRef}
          setIsShowModal={setIsShowModal}
          roomId={roomId}
        />
      )}
      <div className="mt-[18px] w-[1360px] h-fit bg-white nthd_flex_col_between mb-10 custom-scrollbar">
        <div className="bg-black text-center py-2 px-[411px]  w-full rounded-[4px]  nthd_text_normal_sm">
          <span className="text-white flex justify-center items-center gap-1">
            <BsLightningCharge />
            Giữ phòng tối đa 7 ngày
          </span>
        </div>

        <MainBody />
        <Category />
        <div className="flex flex-col gap-14 h-fit">
          <RoomOrder title={`Phòng tương tự của ${holder.fullName}`} data={id} money ={price} address={address.split(',')[1]?.toString()?.trim()?.replace(/\s+/g, '_')}/>
          <RoomOrder title={`Phòng tương tự `} data={null} money ={price} address={address.split(',')[1]?.toString()?.trim()?.replace(/\s+/g, '_')}/>
        </div>
      </div>
    </>
  );
};

export default index;
