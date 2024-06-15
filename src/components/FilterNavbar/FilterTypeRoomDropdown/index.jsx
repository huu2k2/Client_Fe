import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import "animate.css";
import InputCheckBox from "../../InputCheckBox";
import {useQueryFilterData } from "@customhooks";
const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCheckboxChange = (value) => {

    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(value)
        ? prevSelectedRooms.filter((room) => room !== value)
        : [...prevSelectedRooms, value]
    );
  };

  const handleDelete = () => {
    setSelectedRooms([]);
  };
  const [_,setFilterData] = useQueryFilterData();
  const handleApply = () => {
    setFilterData((prev) => ({ ...prev,  Category:[...selectedRooms]}))
    setIsOpen(false)
  };

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <div
        className="flex w-[183px] px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 bg-white shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineEnvironment className="w-5 h-5 text-[#888888]" />
        <div className="">
          <span className="w-full h-full text-gray-500 text-base font-normal leading-5">
            Loại phòng
          </span>
        </div>
      </div>

      <div
        className={`absolute z-10 top-12 left-0 w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
          isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden"
        }`}
      >
        {/* show select  */}
        <div className="w-fit h-fit flex flex-col justify-start gap-4">
        <InputCheckBox
              value={"Studio"}
              label={"Studio"}
              checked={selectedRooms.includes("Studio")}
              onChange={() => handleCheckboxChange("Studio")}
            />
            <InputCheckBox
              value={"Duplex"}
              label={"Duplex"}
              checked={selectedRooms.includes("Duplex")}
              onChange={() => handleCheckboxChange("Duplex")}
            />
            <InputCheckBox
              value={"1PN"}
              label={"1 Phòng ngủ"}
              checked={selectedRooms.includes("1room")}
              onChange={() => handleCheckboxChange("1room")}
            />
            <InputCheckBox
              value={"2PN"}
              label={"2 Phòng ngủ"}
              checked={selectedRooms.includes("2room")}
              onChange={() => handleCheckboxChange("2room")}
            />
            <InputCheckBox
              value={"3PN"}
              label={"3 Phòng ngủ"}
              checked={selectedRooms.includes("3room")}
              onChange={() => handleCheckboxChange("3room")}
            />
            <InputCheckBox
              value={"Ground"}
              label={"Mặt bằng"}
              checked={selectedRooms.includes("Ground")}
              onChange={() => handleCheckboxChange("Ground")}
            />
        </div>

        {/* button delete filter and apply */}
        <div className="w-full h-[34px] flex justify-start gap-2 self-stretch">
          <button
            className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-[#FFE2E5] shadow-sm"
            onClick={handleDelete}
          >
            <span className="text-red-700 text-sm font-medium leading-4">
              Xoá lọc
            </span>
          </button>

          <button
            className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-red-700 shadow-sm"
            onClick={handleApply}
          >
            <span className="text-white text-sm font-medium leading-4">
              Áp dụng
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
