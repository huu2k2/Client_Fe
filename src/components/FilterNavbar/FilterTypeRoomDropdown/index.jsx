import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import "animate.css";
import InputCheckBox from "../../InputCheckBox";
import { useQueryFilterData } from "@customhooks";
import Badge from "@mui/material/Badge";
import { TbBuildingEstate } from "react-icons/tb";

const Index = ({ clear, setClear }) => {
  const [filterData, setFilterData] = useQueryFilterData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (filterData.categories) {
      setSelectedRooms([...filterData.categories]);
    }
  }, [filterData]);

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

  useEffect(() => {
    if (clear) {
      setSelectedRooms([]);
      setFilterData((prev) => ({ ...prev, categories: null }));
    }
  }, [clear]);

  const handleCheckboxChange = (value) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(value)
        ? prevSelectedRooms.filter((room) => room !== value)
        : [...prevSelectedRooms, value]
    );
  };

  const handleApply = () => {
    setFilterData((prev) => ({ ...prev, categories: [...selectedRooms] }));
    setIsOpen(false);
    setClear(false)
  };

  const handleDelete = () => {
    setSelectedRooms([]);
    setFilterData((prev) => ({ ...prev, categories: null }));
  };

  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      badgeContent={selectedRooms?.length || 0}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#dc2626",
          color: "#fff", // Set text color if needed
        },
      }}
      className="mr-2 text-center "
    >
      <div className="relative cursor-pointer" ref={dropdownRef}>
        <div
          className="flex w-[362px] md:w-[183px] px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 bg-white shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TbBuildingEstate className="w-5 h-5 text-[#888888]" />
          <div className="">
            <span className="w-full h-full text-gray-500 text-sm font-normal leading-tight">
              Loại phòng
            </span>
          </div>
        </div>

        <div
          className={`absolute z-10 top-12 left-0 w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:translate-x-[-50%] ${isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden "
            }`}
        >
          {/* show select  */}
          <div className="w-fit h-fit flex flex-col justify-start gap-4 ">
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
              checked={selectedRooms.includes("1PN")}
              onChange={() => handleCheckboxChange("1PN")}
            />
            <InputCheckBox
              value={"2PN"}
              label={"2 Phòng ngủ"}
              checked={selectedRooms.includes("2PN")}
              onChange={() => handleCheckboxChange("2PN")}
            />
            <InputCheckBox
              value={"3PN"}
              label={"3 Phòng ngủ"}
              checked={selectedRooms.includes("3PN")}
              onChange={() => handleCheckboxChange("3PN")}
            />
            <InputCheckBox
              value={"MP"}
              label={"Mặt bằng"}
              checked={selectedRooms.includes("MP")}
              onChange={() => handleCheckboxChange("MP")}
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
    </Badge>
  );
};

export default Index;
