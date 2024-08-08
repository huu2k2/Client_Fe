import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { debounce } from "lodash";
import { useGetListOfAppointmentsQuery } from "@apis/slice/Agencies";
import { useIsLoading } from "@customhooks";

function coverDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}

const SideBar = ({ getInfo }) => {
  const [addDeposit] = useAddDepositMutation();
  const { data: Data } = useGetServicesOfRoomQuery(getInfo.id || 0);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [isCheckSuccess, setIsCheckSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [_, setIsLoading] = useIsLoading();

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    setValue("chuongTrinhUuDai", "");

    try {
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
        rentalPrice: Number(data.rentalPrice.replace(/\./g, "")),
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
        refetch();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedOnSubmit = useCallback(debounce(onSubmit, 2000), []);

  useEffect(() => {
    if (Object.keys(errors).length > 5) {
      toast.error("Bạn điền thiếu thông tin! Vui lòng nhập lại!");
    } else {
      Object.values(errors).forEach((error) => toast.error(error.message));
    }
  }, [errors]);

  const handleDrawerChange = (event) => {
    setIsSidebarOpen(event.target.checked);
    if (event.target.checked) {
      sidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="drawer drawer-end bg-white">
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
          onSubmit={handleSubmit(debouncedOnSubmit)}
          className="menu bg-white w-[556px] h-screen text-base-content min-h-full flex flex-col relative"
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
              getInfo={getInfo}
              setValue={setValue}
              isSidebarOpen={isSidebarOpen}
              getValues={getValues}
            />
            <hr className="bg-gray-700 w-full h-px" />
            <InfoRoom
              register={register}
              getInfo={getInfo}
              setValue={setValue}
              isSidebarOpen={isSidebarOpen}
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
            <ButtonDeposit
              setIsSidebarOpen={setIsSidebarOpen}
              isCheckSuccess={isCheckSuccess}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
