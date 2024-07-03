import React, { useEffect } from "react";
import SimilarRoom from "@components/GridCart/SimilarRoom";
import { useNavigate } from "react-router-dom";


const Index = ({ title, data, money, address,category }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = data
      ? `/similarRooms?idRoom=${data}&Price=${money}&Address=${address}`
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
      {/* {
      data?<SimilarRoom id={data} money={money} address={address?.replace(/_/g, ' ')} />
      : <SimilarRoom id={null} money={money} address={address?.replace(/_/g, ' ')} />
    } */}
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
