import { BsGiftFill } from "react-icons/bs";
import Button from "@components/Button";
import {
  useBooleanIsShowModal,
  useDataServices,
  useGetInfoItem,
  useGetBrokeragePolicy,
} from "@customhooks";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { formatDateType } from "@utils/ConverDate";

const InfoRoom = () => {
  const changeLink = useNavigate();
  const [a, serviceInserts] = useDataServices();
  const [address, price] = useGetInfoItem();
  const [brokeragePolicy] = useGetBrokeragePolicy();
  const [isShowModal, setIsShowModal] = useBooleanIsShowModal();

  const handleShowModal = () => {
    if (localStorage.getItem("token")) {
      setIsShowModal(!isShowModal);
    } else {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      changeLink("/login");
    }
  };

  let Arr = brokeragePolicy?.saleIncentives?.split('\n')?.map(line => line.trim());

  return (
    <>
      <div className="w-[723px] h-[578px] gap-4 flex flex-col justify-between">
        {/* name home in stress */}
        <div className="w-full h-fit">
          {address ? (
            <h1 className="nthd_semibold_2xl_text">{address}</h1>
          ) : (
            <Skeleton height={32} variant="rounded" />
          )}
        </div>

        {/* endow */}
        <div className="w-[723px] h-fit rounded-[4px] border p-2 gap-[102px] bg-[#FFFBEB] border-[#B45309]">
          <div className="w-[707px] h-fit gap-2">
            {/* gift */}
            <div className="w-[82px] h-[24px] gap-2 flex">
              <BsGiftFill />
              <span className="font-medium text-base">Ưu đãi</span>
            </div>
            {/* gift content */}
            <div className="w-full h-[60px] gap-2 px-8 mt-2 overflow-y-auto custom-scrollbar scroll-smooth">
              <ul className="list-disc">
                <li className="nthd_text_normal_sm_text2">
                  Chương trình sale áp dụng từ ngày{" "}
                  {formatDateType(brokeragePolicy.startDate )} - {" "}
                  {formatDateType(brokeragePolicy.endDate  )}
                </li>
                {Arr &&
                  Arr.map((item, index) => (
                    <li className="nthd_text_normal_sm_text2" key={index}>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* info detail home */}
        <div className="w-full rounded-[4px] h-[250px] border px-6 gap-6 py-8 bg-[#F9FAFB] flex flex-col justify-center overflow-y-auto custom-scrollbar scroll-smooth">
          {serviceInserts?.length > 0 ? (
            serviceInserts.map((service, index) => (
              <div className="h-[20px] gap-2 w-fit flex" key={index}>
                <h5 className="w-[320px] nthd_text_medium_sm_h20 block">
                  {service?.serviceName}
                </h5>
                <h5 className="nthd_text_medium_sm_h20">
                  {service.servicePrice} {service.dvt}
                </h5>
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

        <div className="flex justify-between w-full items-center h-40">
          <div className="text-[28px] flex font-semibold leading-[28px] text-red-700">
            {new Intl.NumberFormat("vi-VN").format(price)} VND
            <span className="font-normal text-gray-500 text-base"> / Khách</span>
          </div>

          {/* button */}
          <div className="w-fit flex">
            <div onClick={handleShowModal}>
              <Button
                text={" Đặt lịch xem phòng"}
                color={"text-white"}
                background={"bg-red-700"}
              />
            </div>

            <Link to={"/overview/1"} className="mx-2">
              <Button
                text={"Tổng quan nhà trọ"}
                color={"text-red-700"}
                background={"bg-red-100"}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRoom;
