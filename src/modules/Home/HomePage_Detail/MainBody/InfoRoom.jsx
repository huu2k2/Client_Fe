import { BsGiftFill } from "react-icons/bs";
import Button from "@components/Button";
import {
  useBooleanIsShowModal,
  useDataServices,
  useGetInfoItem,
} from "@customhooks";
import { Skeleton } from "@mui/material";

const InfoRoom = () => {
  const [a, serviceInserts] = useDataServices();
  const [address, price] = useGetInfoItem();
  const [isShowModal, setIsShowModal] = useBooleanIsShowModal();
  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <>
      <div className="w-[723px] h-[578px] gap-4 flex flex-col ">
        {/* name home in stress */}
        <div className="w-full h-fit">
          {address ? (
            <h1 className="nthd_semibold_2xl_text">{address}</h1>
          ) : (
            <Skeleton height={32} variant="rounded" />
          )}
        </div>

        {/* endow  */}
        <div className="w-[723px] h-[96px] rounded-[4px] border p-2 gap-[102px] bg-[#FFFBEB] border-[#B45309] ">
          <div className="w-[707px] h-[80px] gap-2">
            {/* git  */}
            <div className="w-[82px] h-[24px] gap-2 flex">
              <BsGiftFill />
              <span className="font-medium text-base">Ưu đãi</span>
            </div>
            {/*gif content */}
            <div className="w-full h-[48px] gap-2 px-8 mt-2">
              <ul className="list-disc ">
                <li className="nthd_text_normal_sm_text2">
                  Chương trình sale áp dụng từ ngày 23/04/2024 - 23//05/2024
                </li>
                <li className="nthd_text_normal_sm_text2 mt-2">
                  Giảm 300k tiền phòng tháng đầu tiên
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* info detail home  */}
        <div className="mt-2 w-full rounded-[4px] border p-6 gap-6 bg-[#F9FAFB] flex flex-col ">
          {serviceInserts?.length > 0 ? (
            serviceInserts.map((i, index) => (
              <div className="h-[20px] gap-2 w-fit flex" key={index}>
                <h5 className="w-[320px] nthd_text_medium_sm_h20 block">
                  {i?.serviceName}
                </h5>
                <h5 className="nthd_text_medium_sm_h20">
                  {i.servicePrice} {i.dvt}
                </h5>
              </div>
            ))
          ) : (
            <div className="mt-2 w-full rounded-[4px] border p-6 gap-6 bg-[#F9FAFB] flex flex-col ">
              <Skeleton height={20} variant="rounded" />
              <Skeleton height={20} variant="rounded" />
              <Skeleton height={20} variant="rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-between w-full items-center h-40">
          <div className="text-[28px] flex font-semibold leading-[28px]   text-red-700">
            {price} VND
            <span className="font-normal text-gray-500 text-base">
              {"  "}/ Khách
            </span>
          </div>

          {/* button  */}
          <div className="w-fit flex">
            <div onClick={handleShowModal}>
              <Button
                text={" Đặt lịch xem phòng"}
                color={"text-white"}
                background={"bg-red-700"}
              />
            </div>

            <div className="mx-2">
              <Button
                text={"Tổng quan nhà trọ"}
                color={"text-red-700"}
                background={"bg-red-100"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRoom;
