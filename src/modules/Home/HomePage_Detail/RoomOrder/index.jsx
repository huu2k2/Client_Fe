import React, { useEffect } from "react";
import SimilarRoom from "@components/GridCart/SimilarRoom";
import { useNavigate } from "react-router-dom";


const Index = ({ title, data, money, address,category }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    
    const path = data
      ? `/similarRooms?idRoom=${data}&Price=${money}&Address=${address}&category=${category}`
      : `/similarRooms?Price=${money}&Address=${address}`;
    navigate(path);
    // window.location.assign(path)
  };

  return (
    <div className="w-full h-[381px] nthd_flex_col_between ">
      <div className="w-full h-8 flex justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <button
          onClick={handleNavigate}
          className="text-sm font-bold text-rose-600"
        >
          Xem thêm
        </button>
      </div>
       
      <SimilarRoom
        id={data}
        money={money}
        address={address?.replace(/_/g, " ")}
        category={category}
      />
    </div>
  );
};

export default Index;
