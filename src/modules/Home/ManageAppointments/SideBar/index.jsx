import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function coverDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString();
}
const SideBar = ({ getInfo }) => {
  const [addDeposit] = useAddDepositMutation();
  const { data: Data } = useGetServicesOfRoomQuery(getInfo.id || 0);
  // const {data:DeposiInfomationData} =useGetDepositInfomationQuery(1)
  // console.log("data",DeposiInfomationData)
  // State for service and furniture inserts
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);

  // Update service and furniture inserts when getInfo or Data changes
  useEffect(() => {
    setServiceInserts(Data?.response?.serviceInserts);
    setFurnitureInserts(Data?.response?.furnitureInserts);
  }, [getInfo, Data]);

  // React Hook Form setup with Yup validation schema
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isCheckSuccess,setIsCheckSuccess]  = useState(false)
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
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    };

    const kq = await addDeposit(convertData);
    if (kq?.error) {
      toast.error(kq?.error?.data.message);
      setIsCheckSuccess(false)
    } else {
      toast.success(kq.data.message);
      setIsCheckSuccess(true)
    }
  };

  // Display toast notifications for form errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error.message));
      console.log(errors);
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

  return (
    <div className="drawer drawer-end bg-white">
      <ToastContainer className={"z-50"} />
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        onChange={handleDrawerChange}
        checked={isSidebarOpen}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side" ref={sidebarRef}>
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="menu bg-white text-base-content min-h-full w-fit overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="w-full h-[100px] p-6 bg-black flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-lg font-medium leading-7">
                Lên hợp đồng cọc giữ chỗ
              </div>
              <div className="bg-zinc-600 rounded-md justify-center items-center flex">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                >
                  <AiFillCloseSquare className="w-6 h-6 text-white" />
                </label>
              </div>
            </div>
            <div className="self-stretch text-zinc-400 text-sm font-normal leading-tight">
              Vui lòng nhập các thông tin dưới đây để lên hợp đồng.
            </div>
          </div>
          {/* Header End */}

          {/* Form Sections */}
          <InfoClient
           register={register}
           getInfo={getInfo}
           setValue={setValue}
           isSidebarOpen={isSidebarOpen}
          />
          <InfoRoom
            register={register}
            getInfo={getInfo}
            setValue={setValue}
            isSidebarOpen={isSidebarOpen}
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
          <ButtonDeposit setIsSidebarOpen={setIsSidebarOpen} isCheckSuccess={isCheckSuccess} />
          {/* Form Sections End */}
        </form>
      </div>
    </div>
  );
};

export default SideBar;
