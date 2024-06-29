import React, { useEffect } from 'react';
import SimilarRoom from "@components/GridCart/SimilarRoom";
import { useNavigate } from "react-router-dom";
import { useClickSearchFilter, useQueryFilterData } from '../../../../customHooks/FilterCustomHook';

const Index = ({ title, data, money, address }) => {
 const [filterData, setFilterData]=useQueryFilterData()
 const handleClickSearch= useClickSearchFilter()
 useEffect(()=>{
  setFilterData({})
  handleClickSearch()
 },[])
 
  const navigate = useNavigate();

  const handleNavigate = () => {
    handleClickSearch()
    const path = data 
      ? `/similarRooms?idRoom=${data}`
      : `/similarRooms?Price=${money}&Address=${address}`;
    navigate(path);
  };

  return (
    <div className="w-full h-[381px] nthd_flex_col_between ">
      <div className="w-full h-8 flex justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <button
          onClick={handleNavigate}
          className="text-sm font-medium text-red-500"
        >
          Xem thêm
        </button>
      </div>

      <SimilarRoom id={data} money={money} address={address?.replace(/_/g, ' ')} />
    </div>
  );
};

export default Index;
