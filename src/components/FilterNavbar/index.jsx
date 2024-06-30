import { AiOutlineSearch } from "react-icons/ai";
import Location from "./FilterSelectItemDropdow";
import TypeRoom from "./FilterTypeRoomDropdown";
import FilterStatusDropdow from "./FilterStatusDropdow";
import FilterPriceDropDow from "./FilterPriceDropDow";
import FilterAdd from "./FilterAdd";
import { useQueryFilterData } from "@customhooks";
import { debounce } from "@utils";
import { useClickSearchFilter } from "@customhooks/FilterCustomHook";

const index = () => {
  const [setFilterData] = useQueryFilterData();

  const handleSearch = useClickSearchFilter()

  const handleChangeInput = (e) => {
    setFilterData((prev) => ({ ...prev, Address: e.target.value }));
  };
  // debounce
  const debounceTypingInput = debounce(handleChangeInput, 500);
  const debounceHandleSearch = debounce(handleSearch, 500);
  return (
    <div className="w-[1360px]  h-[70px] p-4 gap-2 flex   items-center ">
      <div className="flex w-[362px] h-[38px] cursor-pointer px-[13px] py-[9px] items-center gap-2 rounded-[6px] border border-gray-300 shadow-sm bg-white">
        <AiOutlineSearch className="w-5 h-5" />

        <input
          type="text"
          placeholder="Từ khoá, Đường, Quận, Dự án hoặc địa..."
          className="w-full h-5 border-0 border-none outline-none no-focus-outline text-sm text-gray-500  font-normal leading-5 "
          onChange={debounceTypingInput}
        />
      </div>
      <Location />
      <TypeRoom />
      <FilterStatusDropdow />
      <FilterPriceDropDow />
      <FilterAdd />
      <div
        className="w-[38px]   bg-rose-600 rounded-[50%] flex justify-center items-center p-[9px] cursor-pointer  active:bg-rose-700 "
        onClick={debounceHandleSearch}
      >
        <AiOutlineSearch className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default index;
