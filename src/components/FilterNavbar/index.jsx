import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Location from "./FilterSelectItemDropdow";
import TypeRoom from "./FilterTypeRoomDropdown";
import FilterStatusDropdow from "./FilterStatusDropdow";
import FilterPriceDropDow from "./FilterPriceDropDow";
import FilterAdd from "./FilterAdd";
import {
  useQueryFilterData,
  useClickRemoveFilter,
} from "@customhooks";
import { debounce } from "@utils";
import {
  useGetHouseNameQuery,
  usePostVeriPWMutation,
} from "../../apis/slice/Houses";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ImgLock from "../../assets/lock.png";
import { toast } from "react-toastify";

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
    handleRemoveFilter()
  }, 500);

  // check password
  const [getTextS, setTextS] = useState("");
  const [getHome, setHome] = useState(null);
  const [filterData, setFilterData] = useQueryFilterData();

  const handlePickOption = (option) => {
    if (option.isExclusive) {
      setHome(option);
      document.getElementById("modal_oclock_main").showModal();
    } else {
      setOption(option.houseId);
      setFilterData((prev) => ({ ...prev, houseId: option.houseId }));
      setSearchInput(option.houseName);
      setColse(false);
    }
  };

  const modalRef = useRef(null);
  const [postCheckPW] = usePostVeriPWMutation();
  const hanldeCheckPW = async () => {
    try {
      const kq = await postCheckPW({
        houseId: getHome.houseId,
        housePass: getTextS,
      }).unwrap();
      if (kq.response) {
        setFilterData((prev) => ({
          ...prev,
          houseId: getHome.houseId,
          housePass: getTextS.trim(),
        }));
        setSearchInput(getHome.houseName);
        setColse(false);
        setTextS(""); // Clear the password input
        modalRef.current.close(); // Close the modal
      } else {
        setTextS("");
        toast.error("Mật khẩu không chính xác!");
      }
    } catch (error) {
      setTextS("");
      toast.error("Mật khẩu không chính xác!");
    }
  };

  return (
    <div className="w-fit h-fit lg:w-[1360px] lg:h-[70px] py-4 gap-2 flex items-center justify-start flex-wrap">
      <div className="flex w-[362px] h-[44px] cursor-pointer px-[13px] py-[9px] items-center gap-2 rounded-[6px] border relative border-gray-300 shadow-sm bg-white">
        <AiOutlineSearch className="w-5 h-5 text-[#888]" />
        <div className="relative mt-4 h-full w-full">
          <input
            type="text"
            placeholder="Từ khoá, Đường, Quận, Dự án hoặc địa..."
            value={searchInput}
            onChange={handleChangeInput}
            className="w-full border-none outline-none mt-[-8px] block placeholder:text-sm"
          />
          {searchInput && close && (
            <div
              id="myDropdown"
              className="absolute mt-3 left-[-42px] bg-white border border-gray-300 rounded-md shadow-lg z-50 w-[330px]"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    className="flex justify-between items-center w-full px-2"
                    key={index}
                  >
                    <p
                      onClick={() => handlePickOption(option)}
                      className="w-[90%] pl-4 py-3 rounded-md hover:after:w-full cursor-pointer relative after:content-[''] after:bg-rose-500 after:w-0 after:h-1 after:absolute after:left-0 after:duration-200 after:bottom-0"
                    >
                      {option.houseName}
                    </p>
                    {option.isExclusive && (
                      <img src={ImgLock} className="w-5 h-5" alt="lock icon" />
                    )}
                  </div>
                ))
              ) : (
                <p className="p-2 text-rose-500">Không tìm thấy!</p>
              )}
            </div>
          )}
        </div>
        {searchInput && (
          <button
            className="text-gray-500 text-xl rounded-[50%] ml-4 absolute right-2"
            onClick={() => {
              setOption(null);
              setColse(false);
              setOption("");
              setSearchInput("");
            }}
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
      {/* my modal */}

      <dialog id="modal_oclock_main" className="modal z-10" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Bạn hãy nhập mật khẩu của nhà độc quyền!
          </h3>
          <input
            type="text"
            placeholder=""
            value={getTextS}
            onChange={(e) => setTextS(e.target.value)}
            className="input input-bordered w-full max-w-xs mt-5"
          />
          <div className="modal-action">
            <button className="btn btn-outline" onClick={hanldeCheckPW}>
              OK
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilterNavbar;
