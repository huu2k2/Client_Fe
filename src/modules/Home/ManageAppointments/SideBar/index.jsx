import React, {  useEffect, useRef, useState } from "react";
import InfoClient from "./InfoClient";
import InfoRoom from "./InfoRoom";
import Surcharges from "./surcharges";
import Furniture from "./Furniture";
import ButtonDeposit from "./ButtonDeposit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { useAddDepositMutation } from "@apis/slice/Deposit";
import { useGetServicesOfRoomQuery } from "@apis/slice/services";
import { toast } from "react-toastify";
import { useGetListOfAppointmentsQuery } from "@apis/slice/Agencies";
import { useIsLoading } from "@customhooks";
import { useInfoOfNotification, useSetInfo, useSetTotalReduce } from "../../../../customHooks";
import RowTotalFinal from "./RowTotalFinal";
import Payment from "../../../../components/Modal/Payment";
import { decodeToken } from "../../../../utils/GetIdAuth";
// import { useSocket } from "../../../../customHooks/SocketContext";

function coverDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}

const SideBar = () => {
  const [getInfo, setInfo] = useSetInfo();
  const [addDeposit] = useAddDepositMutation();
  const { data: Data } = useGetServicesOfRoomQuery(getInfo.id || 0);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [isCheckSuccess, setIsCheckSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [_, setIsLoading] = useIsLoading();
  const [depositId, setDepositId] = useState(null); // New state for deposit ID
  const [, setTotalReduce] = useSetTotalReduce();
  const [isPaysment, setIsPayment] = useState(true);

  useEffect(() => {
    if (Data?.response) {
      setServiceInserts(Data.response.serviceInserts);
      setFurnitureInserts(Data.response.furnitureInserts);
    }
  }, [Data]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { refetch } = useGetListOfAppointmentsQuery({ queries: {}, body: {} });



  useEffect(() => {
    setValue("sheduleId", getInfo.scheduleId);
    setValue("phoneNumber", getInfo.phoneNumber);
    setValue("houseAddress", getInfo.houseAddress);
    setValue("rentalPrice", getInfo.rentalPrice);
  }, [getInfo]);

  useEffect(() => {
    if (furnitureInserts) {
      const value = Number(
        furnitureInserts
          .filter((i) => i.isActived) // Filter only checked items
          .map((i) => i.price) // Map to their prices
          .reduce((acc, curr) => acc + curr, 0) || 0
      );
      setTotalReduce(value);
      getInfo.totalReduce = getInfo.rentalPrice + value;
    }
  }, [furnitureInserts, getInfo]);

  const handleDrawerChange = (event) => {
    setIsSidebarOpen(event.target.checked);
    if (event.target.checked) {
      sidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const [dataInfo,setDataInfo,countInfo,setCountInfo] = useInfoOfNotification();
  // socket 
  // const socket = useSocket();

  // Hàm gửi thông báo
  const handleSendNotification = (receiverID,payload) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = decodeToken(token);

    // if (decodedToken && decodedToken.Id) {
    //   socket.emit(
    //     "notification",
    //     decodedToken.Id,
    //     receiverID,
    //     JSON.stringify(payload)
    //   );
    // } else {
    //   console.error("Invalid token or ID");
    // }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    setValue("chuongTrinhUuDai", "");
    try {

      if (furnitureInserts.length > 0 && serviceInserts.length > 0) {
        const kq = await addDeposit({
          ...data,
          furnitures: furnitureInserts,
          services: serviceInserts,
          birthOfDay: coverDate(data.birthOfDay),
          depositDate: coverDate(data.depositDate),
          rentalStartDate: coverDate(data.rentalStartDate),
          dateRange: coverDate(data.dateRange),
          depositPaymentDeadline: coverDate(data.depositPaymentDeadline),
          roomId: data.roomId,
          rentalPrice: Number(data?.rentalPrice?.replace(/\./g, "")),
          commissionPolicyId: Number(data.commissionPolicyId),
          houseId: getInfo.houseId,
          additionalDepositAmount: Number(
            data.additionalDepositAmount.replace(/\./g, "")
          ),
          depositAmount: Number(data.depositAmount.replace(/\./g, "")),
          numberOfPeople: Number(data.numberOfPeople),
          numberOfVehicle: Number(data.numberOfVehicle),
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          totalDepositAmount: Number(data.totalDepositAmount),
        });
        if (kq?.error) {
          toast.error(kq.error.data.message);
          setIsCheckSuccess(false);
        } else {
          toast.success(kq.data.message);
          setIsCheckSuccess(true);
          setDepositId(kq.data.depositId);
          refetch();
          setIsLoading(false);
        }
        console.log("kq", furnitureInserts, serviceInserts)
        
        setDataInfo([

          { type: "DATCOC", roomcode:data.roomCode, address: data.houseAddress, time: format(new Date(), 'HH:mm, dd/MM/yyyy') },
          ...dataInfo
        ]);
        setCountInfo(countInfo+1)
      } else {
        console.log("looix")
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi dữ liệu.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 5) {
      toast.error("Bạn điền thiếu thông tin! Vui lòng nhập lại!");
    } else {
      Object.values(errors).forEach((error) => toast.error(error.message));
    }
  }, [errors]);

  return (
    <div className="drawer drawer-end bg-white  z-[100]">
      {depositId && isPaysment && <Payment
        id={depositId}
        setIsPayment={setIsPayment}
      />}
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        onChange={handleDrawerChange}
        checked={isSidebarOpen}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side h-screen w-screen" ref={sidebarRef}>
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="menu bg-white w-full md:w-[556px] h-screen text-base-content min-h-full flex flex-col relative"
        >
          <div className="w-full h-fit p-6 bg-black flex-col justify-start items-start gap-1 inline-flex fixed top-0 right-0">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-lg font-medium leading-7">
                Lên hợp đồng cọc giữ chỗ
              </div>
            </div>
            <div className="self-stretch text-zinc-400 text-sm font-normal leading-tight">
              Vui lòng nhập các thông tin dưới đây để lên hợp đồng.
            </div>
          </div>
          <div className="w-full h-fit flex flex-col overflow-y-auto custom-scrollbar mt-24">
            <InfoClient
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <InfoRoom
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <Surcharges
              register={register}
              serviceInserts={serviceInserts}
              setServiceInserts={setServiceInserts}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <Furniture
              furnitureInserts={furnitureInserts}
              setFurnitureInserts={setFurnitureInserts}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <RowTotalFinal
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <ButtonDeposit setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        </form>
      </div>

    </div>
  );
};

export default SideBar;