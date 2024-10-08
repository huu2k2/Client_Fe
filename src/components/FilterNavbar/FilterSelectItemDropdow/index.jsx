import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import "animate.css";
import ProvinceInput from "./ProvinceInput";

import DistancesInput from "./DistancesInput";

const Location = ({ clear, setClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionWard, setSelectedOptionWard] = useState(null);
  useEffect(() => {
    if (clear) {
      setSelectedOption(null);
      setSelectedOptionWard(null);

    }
  }, [clear]);
  // Lifted state

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

  // hide , show new div
  const [isShow, setShow] = useState(false);


  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex w-[362px] md:w-[183px] px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 bg-white shadow-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineEnvironment className="w-5 h-5 text-[#888888]" />
        <div className="w-fit block h-full text-gray-500 truncate">
          <span className=" ">
            {selectedOption || selectedOptionWard
              ? `${selectedOption?.label}, ${selectedOptionWard?.label ? selectedOptionWard?.label : ''}`
              : "Toàn quốc"}
          </span>
        </div>
      </div>

      <div
        className={`absolute z-10 top-12  left-0 w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden"
          }`}
      >
        <ProvinceInput
          clear={clear}
          setClear={setClear}
          setShow={setShow}
          isShow={isShow}
          setIsOpen={setIsOpen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedOptionWard={selectedOptionWard}
          setSelectedOptionWard={setSelectedOptionWard}
        />
        {/* {isShow ? (
          <DistancesInput setShow={setShow} setIsOpen={setIsOpen}/>
        ) : (
          <ProvinceInput setShow={setShow} isShow={isShow} setIsOpen={setIsOpen}/>
        )} */}
      </div>
      {/* end form */}
    </div>
  );
};

export default Location;
