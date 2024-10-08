import React, { useState, useEffect, useRef } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "animate.css";
import InputCheckBox from "../../InputCheckBox";
import { categoryItems, utilitiesItems } from "./categoryItem";
import { useQueryFilterData } from "@customhooks";
import { Badge } from "@mui/material"; // Ensure Badge is imported
import { BsWifi ,BsCardList } from "react-icons/bs";

// check if an item exists in Utilities
const checkForValueOfUtilities = (arr, value) => {
  return arr.some((item) => item === value);
};

const Index = ({ clear, setClear }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const [selectedAddFurniture, setSelectedAddFurniture] = useState([]);
  const [selectedAddUtilities, setSelectedAddUtilities] = useState([]);

  const handleCheckboxChangeFurniture = (value) => {
    setSelectedAddFurniture((prevSelectedItems) =>
      prevSelectedItems.includes(value)
        ? prevSelectedItems.filter((item) => item !== value)
        : [...prevSelectedItems, value]
    );
  };

  const handleCheckboxChangeUtilities = (value) => {
    setSelectedAddUtilities((prevSelectedItems) =>
      prevSelectedItems.includes(value)
        ? prevSelectedItems.filter((item) => item !== value)
        : [...prevSelectedItems, value]
    );
  };



  const [_, setFilterData] = useQueryFilterData();

  useEffect(() => {
    if (clear) {
      setSelectedAddFurniture([]);
      setSelectedAddUtilities([]);
    }
  }, [clear]);

  const handleApply = () => {
    setFilterData((prev) => ({
      ...prev,
      furnitures: [...selectedAddFurniture],
      parking: checkForValueOfUtilities(selectedAddUtilities, 'Parking'),
      security: checkForValueOfUtilities(selectedAddUtilities, 'Parking'),
      elevator: checkForValueOfUtilities(selectedAddUtilities, 'Elevator'),
      washing: checkForValueOfUtilities(selectedAddUtilities, 'Washing'),
      pet: checkForValueOfUtilities(selectedAddUtilities, 'Pet'),
      freeHour: checkForValueOfUtilities(selectedAddUtilities, 'FreeHours'),
    }));
    setIsOpen(false);
    setClear(false)

  };
  const handleDelete = () => {
    setSelectedAddFurniture([]);
    setSelectedAddUtilities([]);
    setFilterData((prev) => ({
      ...prev,
      furnitures: null,
      parking: null,
      security: null,
      elevator: null,
      washing: null,
      pet: null,
      freeHour: null,
    }));
  };
  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      badgeContent={selectedAddFurniture?.length + selectedAddUtilities?.length || 0}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#dc2626",
          color: "#fff",
        },
      }}
      className="mr-2 text-center"
    >
      <div className="relative cursor-pointer" ref={dropdownRef}>
        <div
          className="flex w-[362px] md:w-[148px] px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 bg-white shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlineFilter className="w-5 h-5 text-[#888888]" />
          <div className="">
            <span className="w-full h-full text-gray-500 text-base font-normal leading-5">
              Lọc Thêm
            </span>
          </div>
        </div>

        <div
          className={`absolute z-10 top-12 left-0 md:right-0  w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden"
            }`}
        >
          {/* show select */}
          <div className="w-full h-6 gap-2 flex items-center ">
            <BsCardList />
            <span className="text-black text-base font-medium leading-6">
              Danh mục nội thất
            </span>
          </div>
          <div className="w-fit h-fit gap-4 grid grid-cols-2 grid-rows-2">
            {categoryItems.map((i) => (
              <InputCheckBox
                key={i.id}
                value={selectedAddFurniture.includes(i.value)}
                label={i.label}
                checked={selectedAddFurniture.includes(i.value)}
                onChange={() => handleCheckboxChangeFurniture(i.value)}
              />
            ))}
          </div>

          <div className="w-full h-6 gap-2 flex items-center justify-start">
            <BsWifi />
            <span className="text-black text-base font-medium leading-normal">
              Danh mục tiện ích
            </span>
          </div>
          <div className="w-fit h-fit gap-4 grid grid-cols-2 grid-rows-3">
            {utilitiesItems.map((i) => (
              <InputCheckBox
                key={i.id}
                value={i.value}
                label={i.label}
                checked={selectedAddUtilities.includes(i.value)}
                onChange={() => handleCheckboxChangeUtilities(i.value)}
              />
            ))}
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
    </Badge>
  );
};

export default Index;
