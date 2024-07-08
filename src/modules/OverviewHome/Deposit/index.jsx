import React, { useEffect, useState } from "react";
import AdditionalCharges from "./AdditionalCharges";
import FurnitureCatalog from "./FurnitureCatalog";
import InfoTitle from "./InfoTitle";
import InformationApartment from "./InformationApartment";
import SalesInformation from "./SalesInformation";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetServicesOfRoomQuery } from "@apis/slice/services";
import { useParams } from "react-router-dom";
const FormWrapper = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { idRoom } = useParams();
  const { data: Data } = useGetServicesOfRoomQuery(idRoom);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [PickFurnitureInserts, setPickFurnitureInserts] = useState([]);

  const [serviceInserts, setServiceInserts] = useState([]);
  const [PickServiceInserts, setPickServiceInserts] = useState([]);
  useEffect(() => {
    setServiceInserts(Data?.response?.serviceInserts);
    setFurnitureInserts(Data?.response?.furnitureInserts);
  }, [idRoom, Data]);

  const onSubmit = (data) =>{
     console.log(data)
    console.log(PickServiceInserts)
    console.log(PickFurnitureInserts)
    }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit px-10 py-6 left-[280px] top-0 absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex"
    >
      <div className="self-stretch h-fit flex-col justify-start items-start gap-8 flex">
        <InfoTitle register={register} errors={errors} />
        <InformationApartment
          register={register}
          errors={errors}
          control={control}
        />
        <AdditionalCharges serviceInserts={serviceInserts} setPickServiceInserts={setPickServiceInserts} register={register}
          errors={errors}/>
        <FurnitureCatalog furnitureInserts={furnitureInserts} setPickFurnitureInserts={setPickFurnitureInserts}/>
        {/* <SalesInformation />  bỏ*/}
        <div className="self-stretch h-[59px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-px flex-col justify-start items-start flex">
            <div className="self-stretch h-px bg-gray-200" />
          </div>
          <div className="self-stretch justify-end items-center gap-3 inline-flex">
            <div className="px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex">
              <button
                className="cursor-pointer text-white text-sm font-medium leading-tight"
                type="submit"
              >
                Đặt cọc
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const Index = () => {
  return (
    <>
      <div className="w-[1920px] h-[116px] py-10 shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex">
          <div className="text-white text-3xl font-bold leading-9">
            Đặt cọc giữ chỗ
          </div>
        </div>
      </div>

      <div className="w-[1920px] h-[3000px] flex-col justify-start items-center inline-flex">
        <div className="w-[1920px] h-[3000px] relative">
          <div className="w-[1920px] h-32 left-0 top-0 absolute bg-black" />
          <FormWrapper />
        </div>
      </div>
    </>
  );
};

export default Index;
