import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQueryFilterData } from "@customhooks";

const SelectCompoment = ({ selectedOption, setSelectedOption, type, data }) => {
  const [filterData] = useQueryFilterData()
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data && data.results) {
      const Datas = data.results;
      const formattedOptions = Datas.map((Data) => ({
        value: type === "district" ? Data.district_id : Data?.ward_id,
        label: type === "district" ? Data.district_name : Data?.ward_name,
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  const handleChange = (option) => {
    setSelectedOption(option);

  };

  return (
    <div className="w-full h-[38px] rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
      <Select
        placeholder={type === "district" ? (filterData?.District ? filterData.District : "Chọn Quận / Huyện") : "Chọn Phường"}
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default SelectCompoment;
