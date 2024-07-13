import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Location from "./FilterSelectItemDropdow";
import TypeRoom from "./FilterTypeRoomDropdown";
import FilterStatusDropdow from "./FilterStatusDropdow";
import FilterPriceDropDow from "./FilterPriceDropDow";
import FilterAdd from "./FilterAdd";
import { useQueryFilterData } from "@customhooks";
import { debounce } from "@utils";
import { useClickSearchFilter } from "@customhooks/FilterCustomHook";
import { useEffect, useState } from "react";
import { useGetHouseNameQuery } from "../../apis/slice/Houses";

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const FilterNavbar = ({ setOption }) => {
  const [filterData, setFilterData] = useQueryFilterData();
  const handleSearch = useClickSearchFilter();
  const [searchInput, setSearchInput] = useState("");

  const [filteredOptions, setFilteredOptions] = useState([]);
  const { data: dataHousesName, isLoading, error } = useGetHouseNameQuery();

  useEffect(() => {
    if (searchInput) {
      const debouncedFilter = debounce(filterFunction, 500);
      debouncedFilter();
    }
  }, [searchInput]);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilterData((prev) => ({ ...prev, Address: value }));
  };

  const debounceHandleSearch = debounce(handleSearch, 500);

  const filterFunction = () => {
    const filter = removeDiacritics(searchInput).toUpperCase();
    const options = dataHousesName?.response || [];
    const filtered = options.filter(option =>
      removeDiacritics(option.houseName).toUpperCase().includes(filter)
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="w-[1360px] h-[70px] p-4 gap-2 flex items-center">
      <div className="flex w-[362px] h-[44px] cursor-pointer px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 shadow-sm bg-white">
        <AiOutlineSearch className="w-5 h-5" />
        <div className="relative mt-4 ">
          <input
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleChangeInput}
            className="w-full border-none outline-none"
          />
          {searchInput && (
            <div
              id="myDropdown"
              className="absolute mt-2 left-[-42px] bg-white border border-gray-300 rounded-md shadow-lg z-50  w-[330px] ">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <p
                    key={index}
                    onClick={() => setOption(option.houseId)}
                    className="px-4 py-3 rounded-md hover:after:w-full duration-500 cursor-pointer  relative
                    after:content-['']  after:bg-rose-500 after:w-0 after:h-1 after:absolute after:left-[-0px] after:duration-500 after:bottom-0 after:flex after:justify-center "
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
      </div>
      <Location />
      <TypeRoom />
      <FilterStatusDropdow />
      <FilterPriceDropDow />
      <FilterAdd />
      <div
        className="w-[38px] bg-rose-600 rounded-full flex justify-center items-center p-[9px] cursor-pointer active:bg-rose-700"
        onClick={debounceHandleSearch}
      >
        <AiOutlineSearch className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default FilterNavbar;
