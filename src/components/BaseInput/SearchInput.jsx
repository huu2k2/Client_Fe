 
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "../../utils/Debounce";

const SearchInput = ({data,setListData}) => {
    const [getTextSearch, setTextSearch] = useState("");
    const handleSearch = (e) => {
        setTextSearch(e.target.value);
        console.log(e.target.value)
      };
  const handleChangeSearch = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ]);

  useEffect(() => {
    if (getTextSearch !== "" && data?.response?.items) {
      const searchData = data.response.items.filter((i) =>
        i.customerName.toUpperCase().includes(getTextSearch.toUpperCase())
      );
      setListData(searchData);
    } else {
      setListData(data?.response?.items);
    }
  }, [getTextSearch,data]);
 
  return (
    <div className="  flex justify-start items-center gap-2 p-2  w-80 focus:outline-none focus-visible:border-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none">
      <svg
        className=" w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <input
        onChange={handleChangeSearch}
        type="search"
        id="default-search"
        className="w-11/12 outline-none bg-gray-50"
        placeholder="Tìm kiếm tên khách hàng..."
      />
    </div>
  );
};

export default SearchInput;
