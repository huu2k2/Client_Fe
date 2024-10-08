import React from "react";
import { useLocation, useParams } from "react-router-dom";
import GridCart from "../GridCart";
import { useGetFavoriteQuery } from "../../apis/slice/Agencies";

const Index = (option) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idroom = queryParams.get("idRoom") || null;
  const money = queryParams.get("Price") || null;
  const address = queryParams.get("Address")?.replace(/_/g, " ") || null;
  const category = queryParams.get("category") || null;
  const { data: faveritedata } = useGetFavoriteQuery();
  return (
    <div className="w-fit lg:w-[1360px] flex flex-col gap-5 mb-20">
      <GridCart
        option={option}
        id={idroom}
        money={money}
        address={address}
        category={category}
        faveritedata={faveritedata}
      />
    </div>
  );
};

export default Index;
