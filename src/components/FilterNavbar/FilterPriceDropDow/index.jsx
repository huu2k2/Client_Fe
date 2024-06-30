import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import "animate.css";
import { useQueryFilterData } from "@customhooks";
import { useLocation } from "react-router-dom";
import { Badge } from "@mui/material"; // Ensure Badge is imported

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [valueRang, setValueRang] = useState(0);

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

  const handleChangOfRang = (e) => {
    setValueRang(parseInt(e.target.value));
  };

  const [filterData, setFilterData] = useQueryFilterData();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idroom = queryParams.get("idRoom") || null;

  useEffect(() => {
    if (!idroom && filterData.Price > 0) {
      setValueRang(filterData.Price / 100000);
    }
  }, [filterData.Price]);

  const handleApply = () => {
    setFilterData((prev) => ({ ...prev, Price: valueRang * 100000 }));
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilterData((prev) => ({ ...prev, Price: null }));
    setValueRang(0);
  };

  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      badgeContent={valueRang > 0 ? 1 : 0}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#dc2626",
          color: "#dc2626",
        },
      }}
      className="mr-2 text-center"
    >
      <div className="relative cursor-pointer" ref={dropdownRef}>
        <div
          className="flex w-[183px] px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 bg-white shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlineEnvironment className="w-5 h-5 text-[#888888]" />
          <div className="">
            <span className="w-full h-full text-gray-500 text-base font-normal leading-5">
              Giá Thuê
            </span>
          </div>
        </div>

        <div
          className={`absolute z-10 top-12 left-0 w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden"
            }`}
        >
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <span>0</span>
              <span>15 tr</span>
            </div>
            <div className="w-full">
              <input
                type="range"
                id="vol"
                name="vol"
                min="0"
                max="15"
                className="w-full"
                onChange={handleChangOfRang}
                value={valueRang}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-[150px] h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
              <input
                type="text"
                value={0}
                onChange={() => { }}
                className="w-full outline-none text-sm border-none"
                readOnly
              />
              <span>VND</span>
            </div>
            <span>-</span>
            <div className="w-[150px] h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
              <input
                type="text"
                value={valueRang * 100000}
                onChange={(e) => setValueRang(parseInt(e.target.value) / 100000)}
                className="w-full outline-none text-sm border-none"
              />
              <span>VND</span>
            </div>
          </div>

          <div className="w-full h-[34px] flex justify-start gap-2 self-stretch">
            <button
              className="flex py-[9px] px-[13px] justify-center items-center flex-1 rounded-[6px] bg-[#FFE2E5] shadow-sm"
              onClick={handleReset}
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
