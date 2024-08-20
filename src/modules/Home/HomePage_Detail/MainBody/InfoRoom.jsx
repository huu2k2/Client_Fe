import { BsGiftFill } from "react-icons/bs";
import Button from "@components/Button";
import {
  useBooleanIsShowModal,
  useDataServices,
  useGetInfoItem,
  useGetBrokeragePolicy,
} from "@customhooks";
import { Skeleton } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateType } from "@utils/ConverDate";
import { useGetAllDetailQuery } from '@apis/slice/services';

const InfoRoom = () => {
  const { id, roomId } = useParams();
  const changeLink = useNavigate();
  const [a, serviceInserts] = useDataServices();
  const [address, price, address2] = useGetInfoItem();
  const { data } = useGetAllDetailQuery(roomId);
 

  const [brokeragePolicy] = useGetBrokeragePolicy();
  const [isShowModal, setIsShowModal] = useBooleanIsShowModal();

  const handleShowModal = () => {
    if (sessionStorage.getItem("token")) {
      setIsShowModal(!isShowModal);
    } else {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      changeLink("/login");
    }
  };

  let Arr = brokeragePolicy?.saleIncentives
    ?.split("\n")
    ?.map((line) => line?.trim());



  const handleClick = () => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.setItem("idroom", roomId);
      sessionStorage.removeItem("adadvadadv")
      // Chuyển hướng
      changeLink(`/overview/${id}`);
    } else {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      changeLink("/login");
    }
  };
 
  return (
    <>
      <div className="w-full md:w-[723px] h-fit md:h-[578px] gap-4 flex flex-col justify-between">
        {/* name home in stress */}
        <div className="w-full h-fit">
          {address && data ? (
            <>
              <h1 className="nthd_semibold_2xl_text truncate w-[730px] ">{data?.response?.houseName} </h1>
              <p>{address2}</p>
            </>
          ) : (
            <Skeleton height={32} variant="rounded" />
          )}
        </div>

        {/* endow */}
        <div className="w-full md:w-[723px] h-fit rounded-[4px] border p-2 gap-[102px] bg-[#FFFBEB] border-[#B45309]">
          <div className="w-full md:w-[707px] h-fit gap-2">
            {/* gift */}
            <div className="w-[82px] h-[24px] gap-2 flex">
              <BsGiftFill />
              <span className="font-medium text-base">Ưu đãi</span>
            </div>
            {/* gift content */}
            <div className="w-full h-fit gap-2 px-8 pb-5 mt-2 overflow-y-auto custom-scrollbar scroll-smooth">
              <ul className="list-disc">
               {brokeragePolicy?.startDate &&  <li className="nthd_text_normal_sm_text2">
                Chương trình sale áp dụng từ ngày
                  {brokeragePolicy?.startDate && formatDateType(brokeragePolicy?.startDate) +"_"}
                  {brokeragePolicy?.endDate && formatDateType(brokeragePolicy?.endDate)}
                </li>}
                {Arr?.length > 0
                  ? Arr.map((item, index) => (
                    <li
                      className={`nthd_text_normal_sm_text2 ${item === "" && "hidden"
                        }`}
                      key={index}
                    >
                      {item}
                    </li>
                  ))
                  : null}
                  
              </ul>
            </div>
          </div>
        </div>

        {/* info detail home */}
        <div className="w-full rounded-[4px] h-[250px] border px-6 gap-6 py-8 bg-[#F9FAFB] flex flex-col justify-center overflow-y-auto custom-scrollbar scroll-smooth">
          {serviceInserts?.length > 0 ? (
            serviceInserts.map((service, index) => (
              <div className="h-fit md:h-[20px] gap-2 w-full flex justify-between" key={index}>
                <div className=" w-full md:w-[320px] nthd_text_medium_sm_h20 block">
                  {service?.serviceName}
                </div>
                <div className="nthd_text_medium_sm_h20">
                {new Intl.NumberFormat("vi-VN").format(service.servicePrice)}/{service.dvt}
                </div>
              </div>
            ))
          ) : (
            <div className="mt-2 w-full rounded-[4px] border p-6 gap-6 bg-[#F9FAFB] flex flex-col">
              <Skeleton height={20} variant="rounded" />
              <Skeleton height={20} variant="rounded" />
              <Skeleton height={20} variant="rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-between w-full items-center  md:h-40 flex-wrap gap-4">
          <div className="text-[28px] flex font-semibold leading-[28px] text-red-700">
            {new Intl.NumberFormat("vi-VN").format(price)} VND
          </div>

          {/* button */}
          <div className="w-full md:w-fit flex flex-col md:flex-row gap-4 md:gap-2">
            <div onClick={handleShowModal}>
              <Button
                text={" Đặt lịch xem phòng"}
                color={"text-white"}
                background={"bg-red-700 w-full"}
              />
            </div>
            <div onClick={handleClick}>
              <Button
                text={"Tổng quan nhà trọ"}
                color={"text-red-700"}
                background={"bg-red-100 w-full"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRoom;
