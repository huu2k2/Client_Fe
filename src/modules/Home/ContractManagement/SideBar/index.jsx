import React, { useEffect, useRef, useState } from "react";
import InfoClient from "./InfoClient";
import InfoRoom from "./InfoRoom";
import Surcharges from "./surcharges";
import Furniture from "./Furniture";
import ButtonDeposit from "./ButtonDeposit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";

import { toast } from "react-toastify";

import { useGetDepositInfomationQuery } from "@apis/slice/Agencies";
import { format } from "date-fns";
import { usePutDepositInfomationMutation } from "@apis/slice/Agencies";
import { useIsLoading } from "@customhooks";
function coverDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}
const SideBar = ({ getInfo }) => {
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [_, setLoading] = useIsLoading();
  // React Hook Form setup with Yup validation schema
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [putDeposit] = usePutDepositInfomationMutation();
  // Form submission handler
  const onSubmit = async (data) => {
    const convertData = {
      ...data,
      furnitures: furnitureInserts,
      services: serviceInserts,
      birthOfDay: coverDate(data.birthOfDay),
      depositDate: coverDate(data.depositDate),
      rentalStartDate: coverDate(data.rentalStartDate),
      dateRange: coverDate(data.dateRange),
      depositPaymentDeadline: coverDate(data.depositPaymentDeadline),
      roomId: Number(getInfo.id),
      rentalPrice: Number(data.rentalPrice.replace(/\./g, "")),
      commissionPolicyId: Number(data.commissionPolicyId),
      houseId: getInfo.houseId,
      additionalDepositAmount: Number(
        data.additionalDepositAmount.replace(/\./g, "")
      ),
      depositAmount: Number(data.depositAmount.replace(/\./g, "")),
      numberOfPeople: Number(data.numberOfPeople),
      numberOfVehicle: Number(data.numberOfVehicle),
      id: getInfo.depositId,
    };

    const kq = await putDeposit(convertData);
    if (kq?.error) {
      toast.error(kq?.error?.data.message);
    } else {
      toast.success(kq.data.message);
    }
  };

  // Display toast notifications for form errors
  useEffect(() => {
    if (Object.keys(errors).length > 5) {
      toast.error("Bạn chưa  điền thêm 1 số trường!");
    } else {
      Object.values(errors).forEach((error) => toast.error(error.message));
    }
  }, [errors]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleDrawerChange = (event) => {
    setIsSidebarOpen(event.target.checked);
    if (event.target.checked) {
      sidebarRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // get infomation of room
  const { data: DataDepositInfomation, isLoading } =
    useGetDepositInfomationQuery(getInfo.depositId);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (DataDepositInfomation?.isSuccess) {
      setValue("fullName", DataDepositInfomation?.response.fullName);
      setValue("phoneNumber", DataDepositInfomation?.response.phoneNumber);
      setValue(
        "birthOfDay",
        format(
          new Date(DataDepositInfomation?.response.birthOfDay),
          "yyyy-MM-dd"
        )
      );
      setValue(
        "identification",
        DataDepositInfomation?.response.identification
      );
      setValue(
        "dateRange",
        format(
          new Date(DataDepositInfomation?.response.dateRange),
          "yyyy-MM-dd"
        )
      );
      setValue("issuedBy", DataDepositInfomation?.response.issuedBy);
      setValue(
        "permanentAddress",
        DataDepositInfomation?.response.permanentAddress
      );
      setValue("roomId", DataDepositInfomation?.response.roomId);
      setValue("roomCode", getInfo.roomId);
      setValue("houseAddress", DataDepositInfomation?.response.houseAddress);
      setValue(
        "rentalPrice",
        DataDepositInfomation?.response.rentalPrice?.toLocaleString("vi-VN")
      );
      setValue(
        "depositDate",
        format(
          new Date(DataDepositInfomation?.response.depositDate),
          "yyyy-MM-dd"
        )
      );
      setValue(
        "depositAmount",
        DataDepositInfomation?.response.depositAmount?.toLocaleString(
          "vi-VN"
        ) || 0
      );
      setValue(
        "additionalDepositAmount",
        DataDepositInfomation?.response.additionalDepositAmount?.toLocaleString(
          "vi-VN"
        ) || 0
      );
      setValue(
        "depositPaymentDeadline",
        format(
          new Date(DataDepositInfomation?.response.depositPaymentDeadline),
          "yyyy-MM-dd"
        )
      );
      setValue(
        "rentalStartDate",
        format(
          new Date(DataDepositInfomation?.response.rentalStartDate),
          "yyyy-MM-dd"
        )
      );
      setValue(
        "numberOfPeople",
        DataDepositInfomation?.response.numberOfPeople
      );
      setValue(
        "numberOfVehicle",
        DataDepositInfomation?.response.numberOfVehicle
      );
      setValue(
        "chuongTrinhUuDai",
        DataDepositInfomation?.response.chuongTrinhUuDai || " "
      );
      setValue("note", DataDepositInfomation?.response.note);
      setValue("rentalTerm", DataDepositInfomation?.response.rentalTerm);
      setValue(
        "commissionPolicyId",
        DataDepositInfomation?.response?.commissionPolicy?.id
      );
      setValue(
        "commissionPolicyLable",
        `${DataDepositInfomation?.response?.commissionPolicy?.month} tháng - Cọc ${DataDepositInfomation?.response?.commissionPolicy?.deposit} - Hoa hồng ${DataDepositInfomation?.response?.commissionPolicy?.commission}`
      );
      setServiceInserts(DataDepositInfomation?.response?.services);
      setFurnitureInserts(DataDepositInfomation?.response?.furnitures);
      setValue("signature", DataDepositInfomation?.response?.signatureUrl);
    }
  }, [DataDepositInfomation, isSidebarOpen]);
console.log("DataDepositInfomation",DataDepositInfomation)
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-5"
        type="checkbox"
        className="drawer-toggle"
        onChange={handleDrawerChange}
        checked={isSidebarOpen}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side" ref={sidebarRef}>
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="menu bg-white h-screen  relative  text-base-content min-h-full   w-[556px] "
        >
          {/* Header */}
          <div className="w-[556px] h-[100px] p-6 bg-black flex-col justify-start items-start gap-1 inline-flex fixed top-0 right-0">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-lg font-medium leading-7">
                Lên hợp đồng cọc giữ chỗ
              </div>
              <div className="bg-zinc-600 rounded-md justify-center items-center flex"></div>
            </div>
            <div className="self-stretch text-zinc-400 text-sm font-normal leading-tight">
              Vui lòng nhập các thông tin dưới đây để lên hợp đồng.
            </div>
          </div>
          {/* Header End */}
          <div className="w-[556px] h-fit flex flex-col overflow-y-auto custom-scrollbar mt-24">
            <InfoClient
              register={register}
              getInfo={getInfo}
              isSidebarOpen={isSidebarOpen}
              getValues={getValues}
              setValue={setValue}
            />
            <InfoRoom
              register={register}
              getInfo={getInfo}
              setValue={setValue}
              isSidebarOpen={isSidebarOpen}
              getValues={getValues}
            />
            <Surcharges
              register={register}
              serviceInserts={serviceInserts}
              setServiceInserts={setServiceInserts}
            />
            <Furniture
              furnitureInserts={furnitureInserts}
              setFurnitureInserts={setFurnitureInserts}
            />
            <hr className="bg-gray-700 w-full h-[1px]" />
            <ButtonDeposit
              setIsSidebarOpen={setIsSidebarOpen}
              getInfo={getInfo}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
