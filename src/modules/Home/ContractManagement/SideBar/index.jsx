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
import RowTotalFinal from "./RowTotalFinal";
import { useDayMonthofSelect, useRetalPrice, useSetTotalReduce } from "../../../../customHooks";
function coverDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}
const SideBar = ({ getInfo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [, setLoading] = useIsLoading();
  const [getData, setData] = useState([]);
  const [putDeposit] = usePutDepositInfomationMutation();
  const [, setTotalReduce] = useSetTotalReduce();
  const [,setRetalPrice]= useRetalPrice()
  const  [, setNamecommissionPolicyId, , ]= useDayMonthofSelect()
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
  // get infomation of room
  const { data: DataDepositInfomation, isLoading, refetch } =
    useGetDepositInfomationQuery(getInfo.depositId && getInfo.depositId);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (furnitureInserts) {
      const value = Number(
        furnitureInserts
          .filter((i) => i.isActived) // Filter only checked items
          .map((i) => i.price) // Map to their prices
          .reduce((acc, curr) => acc + curr, 0) || 0
      );
      setTotalReduce(value);
    }
  }, [furnitureInserts, getInfo]);

  useEffect(() => {
    if (isSidebarOpen && DataDepositInfomation?.response) {
      const response = DataDepositInfomation?.response;
      console.log(response)
      // Prepare the data object with all the required fields
      const updatedData = {
        fullName: response.fullName,
        phoneNumber: response.phoneNumber,
        birthOfDay: format(new Date(response.birthOfDay), "yyyy-MM-dd"),
        identification: response.identification,
        dateRange: format(new Date(response.dateRange), "yyyy-MM-dd"),
        issuedBy: response.issuedBy,
        permanentAddress: response.permanentAddress,
        roomId: response.roomId,
        roomCode: getInfo.roomId,
        houseAddress: response.houseAddress,
        rentalPrice: response.rentalPrice?.toLocaleString("vi-VN"),
        depositDate: format(new Date(response.depositDate), "yyyy-MM-dd"),
        totalDepositAmount:
          (Number(response?.commissionPolicy?.deposit)*Number(getInfo.rentalPrice))?.toLocaleString("vi-VN"),
        depositAmount: response.depositAmount?.toLocaleString("vi-VN") || 0,
        additionalDepositAmount:
          (Number(response?.commissionPolicy?.deposit)*Number(getInfo.rentalPrice)-Number(response.depositAmount))?.toLocaleString("vi-VN") || 0,
        depositPaymentDeadline: format(
          new Date(response.depositPaymentDeadline),
          "yyyy-MM-dd"
        ),
        rentalStartDate: format(
          new Date(response.rentalStartDate),
          "yyyy-MM-dd"
        ),
        numberOfPeople: response.numberOfPeople,
        numberOfVehicle: response.numberOfVehicle,
        chuongTrinhUuDai: response.chuongTrinhUuDai || " ",
        note: response.note,
        rentalTerm: response.rentalTerm,
        commissionPolicy: response.commissionPolicy,
        commissionPolicyId: response?.commissionPolicyId,
        commissionPolicyLable: `${response?.commissionPolicy?.month} tháng - Cọc ${response?.commissionPolicy?.deposit} - Hoa hồng ${response?.commissionPolicy?.commission}`,
        signature: response?.signature,
        signatureUrl: response?.signatureUrl,
        commissionPolicyMonth: response?.commissionPolicy?.deposit,
      };

      // Update the state with the prepared data
      setData(updatedData);
      //
      setNamecommissionPolicyId(response?.commissionPolicy?.deposit)
      setRetalPrice(getInfo.rentalPrice)
      setValue("roomId", response.roomId);
      setValue("roomCode", getInfo.roomId);
      setValue("signature", response?.signature);
      setValue("signatureUrl", response?.signatureUrl);
      setValue("commissionPolicyId", response?.commissionPolicyId);
      setValue("commissionPolicy", response?.commissionPolicy);
      // Optionally update other states
      setServiceInserts(response?.services);
      setFurnitureInserts(response?.furnitures);
      // 
      setValue("afterIdentificationBase64", response?.afterIdentificationBase64);
      setValue("afterIdentificationUrl", response?.afterIdentificationUrl);
      setValue("beforeIdentificationBase64", response?.beforeIdentificationBase64);
      setValue("beforeIdentificationUrl", response?.beforeIdentificationUrl);

    }
  }, [isSidebarOpen, getInfo, DataDepositInfomation]);

  // Display toast notifications for form errors
  useEffect(() => {
    if (Object.keys(errors).length > 5) {
      toast.error("Bạn chưa  điền thêm 1 số trường!");
    } else {
      Object.values(errors).forEach((error) => toast.error(error.message));
    }
  }, [errors]);

  const handleDrawerChange = (event) => {
    setIsSidebarOpen(event.target.checked);
    if (event.target.checked) {
      sidebarRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const [isSubmit, setIsSubmit] = useState(false)
  // Form submission handler
  const onSubmit = async (data) => {
    console.log("data",data)
    setLoading(true)
    setIsSubmit(true)
    const convertData = {
      ...data,
      furnitures: furnitureInserts,
      services: serviceInserts,
      birthOfDay: coverDate(data.birthOfDay),
      depositDate: coverDate(data.depositDate),
      rentalStartDate: coverDate(data.rentalStartDate),
      dateRange: coverDate(data.dateRange),
      depositPaymentDeadline: coverDate(data.depositPaymentDeadline),
      roomId: Number(data.roomId),
      roomCode: (data.roomCode),
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
      totalDepositAmount: Number(
        data.totalDepositAmount?.replace(/[^0-9]/g, "")
      ),
    };
    try {
      const kq = await putDeposit(convertData);
      refetch()
      toast.success(kq.data.message);
      setIsSidebarOpen(false)
      setLoading(false)
      setIsSubmit(false)
    } catch (error) {
      toast.error(error);
      setLoading(false)
      setIsSubmit(false)
    }
  };

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
          className="menu bg-white h-screen  relative  text-base-content min-h-full   w-full md:w-[556px] "
        >
          {/* Header */}
          <div className="w-full md:w-[556px] h-[100px] p-6 bg-black flex-col justify-start items-start gap-1 inline-flex fixed top-0 right-0">
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
          <div className="w-full h-fit flex flex-col overflow-y-auto custom-scrollbar mt-24">
            <InfoClient
              register={register}
              getInfo={getInfo}
              isSidebarOpen={isSidebarOpen}
              getValues={getValues}
              setValue={setValue}
              getData={getData}
            />
            <InfoRoom
              register={register}
              getInfo={getInfo}
              setValue={setValue}
              isSidebarOpen={isSidebarOpen}
              getValues={getValues}
              getData={getData}
            />
            <Surcharges
              register={register}
              serviceInserts={serviceInserts}
              setServiceInserts={setServiceInserts}
              getInfo={getInfo}
            />
            <Furniture
              furnitureInserts={furnitureInserts}
              setFurnitureInserts={setFurnitureInserts}
              getInfo={getInfo}
            />
             <hr className="bg-gray-700 w-full h-px" />
            <RowTotalFinal
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <hr className="bg-gray-700 w-full h-[1px]" />
            <ButtonDeposit
              getInfo={getInfo}
              isSubmit={isSubmit}
            />
          </div>
        </form>
      </div>

    </div>
  );
};

export default SideBar;
