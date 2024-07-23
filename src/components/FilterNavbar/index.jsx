import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Location from "./FilterSelectItemDropdow";
import TypeRoom from "./FilterTypeRoomDropdown";
import FilterStatusDropdow from "./FilterStatusDropdow";
import FilterPriceDropDow from "./FilterPriceDropDow";
import FilterAdd from "./FilterAdd";
import { useQueryFilterData } from "@customhooks";
import { debounce } from "@utils";
import { useClickRemoveFilter } from "@customhooks/FilterCustomHook";
import { useGetHouseNameQuery } from "../../apis/slice/Houses";
import { IoMdCloseCircleOutline } from "react-icons/io";

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const FilterNavbar = ({ setOption }) => {
  const [clear, setClear] = useState(false);
  const handleRemoveFilter = useClickRemoveFilter();
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [close, setColse] = useState(true);

  const { data: dataHousesName } = useGetHouseNameQuery();

  const filterFunction = () => {
    const filter = removeDiacritics(searchInput).toUpperCase();
    const options = dataHousesName?.response || [];
    const filtered = options.filter((option) =>
      removeDiacritics(option.houseName).toUpperCase().includes(filter)
    );
    setFilteredOptions(filtered);
  };

  const debouncedFilterFunction = debounce(filterFunction, 500);

  useEffect(() => {
    if (searchInput) {
      debouncedFilterFunction();
    }
  }, [searchInput]);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value !== "") {
      setColse(true);
    }
  };

  const debounceHandleRemoveFilter = debounce(() => {
    location.reload()
  }, 500);

  return (
    <div className="w-[1360px] h-[70px] p-4 gap-2 flex items-center">
      <div className="flex w-[362px] h-[44px] cursor-pointer px-[13px] py-[9px] items-center gap-2 rounded-[6px] border relative border-gray-300 shadow-sm bg-white">
        <AiOutlineSearch className="w-5 h-5 text-[#888]" />
        <div className="relative mt-4 h-full">
          <input
            type="text"
            placeholder="Từ khoá, Đường, Quận, Dự án hoặc địa..."
            value={searchInput}
            onChange={handleChangeInput}
            className="w-[266px] border-none outline-none mt-[-8px] block placeholder:text-sm"
          />
          {searchInput && close && (
            <div
              id="myDropdown"
              className="absolute mt-3 left-[-42px] bg-white border border-gray-300 rounded-md shadow-lg z-50 w-[330px]"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <p
                    key={index}
                    onClick={() => (
                      setOption(option.houseId),
                      setSearchInput(option.houseName),
                      setColse(false)
                    )}
                    className="px-4 py-3 rounded-md hover:after:w-full cursor-pointer relative after:content-[''] after:bg-rose-500 after:w-0 after:h-1 after:absolute after:left-0 after:duration-200 after:bottom-0"
                  >
                    {option.houseName}
                  </p>
                ))
              ) : (
                <p className="p-2 text-rose-500">không tìm thấy!</p>
              )}
            </div>
          )}
        </div>
        {searchInput && (
          <button
            className="text-gray-500 text-xl rounded-[50%] ml-4 absolute right-2"
            onClick={() => (
              setOption(null),
              setColse(false),
              setOption(""),
              setSearchInput("")
            )}
          >
            <IoMdCloseCircleOutline />
          </button>
        )}
      </div>
      <Location clear={clear} setClear={setClear} />
      <TypeRoom clear={clear} setClear={setClear} />
      <FilterStatusDropdow clear={clear} setClear={setClear} />
      <FilterPriceDropDow clear={clear} setClear={setClear} />
      <FilterAdd clear={clear} setClear={setClear} />
      <div
        className="w-[38px] bg-rose-600 rounded-full flex justify-center items-center p-[9px] cursor-pointer active:bg-rose-700"
        onClick={debounceHandleRemoveFilter}
      >
        <RiDeleteBin6Line className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default FilterNavbar;
