import React, { useState } from "react";
import { AiOutlineEnvironment, AiFillCaretRight } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { useGetDistrictsQuery, useGetWardsQuery } from "@apis/slice/provices";
import SelectCompoment from "./SelectCompoment";
import { useQueryFilterData } from "@customhooks";

const ProvinceInput = ({
  setShow,
  isShow,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  selectedOptionWard,
  setSelectedOptionWard,
}) => {
  const { data: dataProvices } = useGetDistrictsQuery();
  const { data: dataWard } = useGetWardsQuery(selectedOption?.value);

  const handleChange = () => {
    setShow(!isShow);
  };

  const [_, setFilterData] = useQueryFilterData();
  const handlePrint = () => {
    setFilterData((prev) => ({ ...prev, District: selectedOption?.value, Ward: selectedOptionWard?.value }))
    setIsOpen(false)
  };

  const handleDelete = () => {
    setSelectedOption(null);
    setSelectedOptionWard(null);
    setFilterData((prev) => ({ ...prev, District: "", Ward: "" }))
  };

  return (
    <>
      <div className="h-[78px] w-full gap-4 flex flex-col items-start self-stretch">
        <div className="w-full h-6 gap-2 flex items-center">
          <AiOutlineEnvironment className="w-5 h-5 text-[#888888]" />
          <span className="text-Black text-base font-medium leading-6">
            Tìm kiếm quanh bạn
          </span>
        </div>

        <div className="w-full h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
          {/* <button type="button" className="w-[236px] outline-none text-sm">
            Nhập vị trí và khoảng cách tìm kiếm
          </button> */}
          {/* <AiFillCaretRight onClick={handleChange} className="cursor-pointer" /> */}
          <span className="w-[236px] outline-none text-sm">
            Tp.Hồ Chí Minh
          </span>
        </div>
      </div>

      <div className="h-fit w-full gap-4 flex flex-col items-start self-stretch">
        <div className="w-full h-6 gap-2 flex items-center">
          <BsBuilding className="w-5 h-5 text-[#888888]" />
          <span className="text-Black text-base font-medium leading-6">
            Tìm theo khu vực
          </span>
        </div>

        <SelectCompoment
          data={dataProvices}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          type="district"
        />

        <SelectCompoment
          data={dataWard}
          selectedOption={selectedOptionWard}
          setSelectedOption={setSelectedOptionWard}
          type="ward"
        />
      </div>

      <div className="w-full h-[34px] flex justify-start gap-2 self-stretch">
        <button
          type="button"
          className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-[#FFE2E5] shadow-sm"
          onClick={handleDelete}
        >
          <span className="text-red-700 text-sm font-medium leading-4">
            Xoá lọc
          </span>
        </button>

        <button
          className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-red-700 shadow-sm"
          onClick={handlePrint}
        >
          <span className="text-white text-sm font-medium leading-4">
            Áp dụng
          </span>
        </button>
      </div>
    </>
  );
};

export default ProvinceInput;
