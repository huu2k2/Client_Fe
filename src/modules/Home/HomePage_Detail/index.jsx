import MainBody from "./MainBody";

import Category from "./Category";
import RoomOrder from "./RoomOrder";
import { BsLightningCharge } from "react-icons/bs";
import { ModalPutRoom } from "@components/Modal";
import { useBooleanIsShowModal } from "@customhooks";

import { useParams } from "react-router-dom";
import { useGetDataDetail } from "../../../customHooks";
import { useEffect } from "react";
import { useGetAllDetailQuery } from "@apis/slice/services";
import {
  useClickSearchFilter,
  useQueryFilterData,
} from "@customhooks/FilterCustomHook";
import { Helmet } from "react-helmet";

const initialFilterData = {
  houseId: null,
  districtId: null,
  wardId: null,
  categories: null,
  status: null,
  price: null,
  hasDeposited: null,
  hasRented: null,
  furnitures: null,
  parking: null,
  security: null,
  elevator: null,
  pet: null,
  freeHour: null,
  washing: null,
  roomQuantity: null,
};

const index = () => {
  const [isShowModal, setIsShowModal, dropdownRef] = useBooleanIsShowModal();
  const { id, roomId } = useParams();
  const setData = useGetDataDetail();
  const { data,isLoading } = useGetAllDetailQuery(roomId);
  useEffect(() => {
    setData(data);
  }, [data]);
  const [filterData, setFilterData] = useQueryFilterData();
  const handleClickSearch = useClickSearchFilter();
  useEffect(() => {
    setFilterData(initialFilterData);
    if (filterData === initialFilterData) {
      handleClickSearch();
    }
  }, [filterData]);

  return (
    <>
    <Helmet>
        <title>Chi tiết phòng</title>
        <meta name="description" content="Chi tiết phòng" />
    </Helmet>
      {isShowModal && (
        <ModalPutRoom
          dropdownRef={dropdownRef}
          setIsShowModal={setIsShowModal}
          roomId={roomId}
          id={id}
        />
      )}
      <div className="mt-[18px] w-full px-10 lg:px-0 lg:w-[1360px] h-fit bg-white flex flex-col justify-center lg:justify-between items-center mb-10 custom-scrollbar">
        <div className="bg-black text-center py-2 lg:px-[411px]  w-full rounded-[4px]  nthd_text_normal_sm">
          <span className="text-white flex justify-center items-center gap-1">
            <BsLightningCharge />
            Giữ phòng tối đa 7 ngày
          </span>
        </div>

        <MainBody />
        <Category />
        <div className="flex flex-col gap-14 h-fit">
          <RoomOrder
            title={`Phòng tương tự của ${data?.response?.holder?.fullName}`}
            data={id}
            money={data?.response?.rentPrice}
            address={data?.response?.houseAddress
              ?.split(",")[1]
              ?.toString()
              ?.trim()
              ?.replace(/\s+/g, "_")}
            category={
              data?.response?.category ? data?.response?.category : null
            }
          />
          <RoomOrder
            title={`Phòng tương tự  `}
            data={id}
            money={data?.response?.rentPrice}
            address={data?.response?.houseAddress
              ?.split(",")[1]
              ?.toString()
              ?.trim()
              ?.replace(/\s+/g, "_")}
            category={null}
          />
        </div>
      </div>
    </>
  );
};

export default index;
