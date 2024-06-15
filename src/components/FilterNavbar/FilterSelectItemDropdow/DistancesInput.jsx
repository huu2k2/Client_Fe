import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate";

import { AiOutlineArrowLeft } from "react-icons/ai";
import "animate.css";
import {useQueryFilterData } from "@customhooks";
const DistancesInput = ({ setShow ,setIsOpen}) => {
  const [valueRang, setValueRang] = useState(25);
  const handleChangOfRang = (e) => {
    setValueRang(e.target.value);
  };

  // use form
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const [_,setFilterData] = useQueryFilterData();
  const onSubmit = (data) => {
    setFilterData((prev) => ({ ...prev,  address:data.address,distanceLookAt:data.distanceLookAt}))
    setIsOpen(false)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-[40px] w-full gap-4 flex flex-col items-start self-stretch border-b-2">
        <div className="w-full h-6 gap-2 flex items-center ">
          <AiOutlineArrowLeft
            className="w-5 h-5 text-[#888888]"
            onClick={() => setShow(false)}
          />
          <span className="text-Black text-base font-medium leading-6">
            Tìm kiếm quanh bạn
          </span>
        </div>
      </div>
      {/* search */}
      <div className="flex flex-col items-start gap-4">
        <span className="text-Black text-base font-medium leading-6">
          Vị trí tìm kiếm
        </span>

        <div className="w-full h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
          <input
            {...register("address")}
            type="text"
            placeholder="Nhập vị trí và khoảng cách tìm kiếm"
            className="w-[236px] outline-none text-sm"
          />
        </div>
      </div>
      {/* bán kính */}
      <div className="flex flex-col gap-4">
        <span className="text-Black text-base font-medium leading-6">
          Bán kính tìm kiếm
        </span>
      </div>
      {/* rang input */}
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span>0</span>
          <span>50 km</span>
        </div>
        <div className="w-full ">
          <input
            {...register("distanceLookAt")}
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="50"
            className="w-full"
            onChange={(e) => handleChangOfRang(e)}
            value={valueRang}
          />
        </div>
      </div>

      <div className="w-full h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
        <input
          type="text"
          value={valueRang}
          onChange={(e) => setValueRang(e.target.value)}
          className="w-[236px] outline-none text-sm"
        />
      </div>
      <div className="w-full h-[34px] flex justify-start gap-2 self-stretch">
        <button
          className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-red-700 shadow-sm"
          type="submit"
        >
          <span className="text-white text-sm font-medium leading-4">
            Áp dụng
          </span>
        </button>
      </div>
    </form>
  );
};

export default DistancesInput;
