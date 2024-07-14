import React from "react";
import { useLocation, useParams } from "react-router-dom";
import GridCart from "../GridCart";
import SimilarRoom from "../GridCart/SimilarRoom";
import { useGetFavoriteQuery } from "../../apis/slice/Agencies";

const Index = (option) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idroom = queryParams.get("idRoom") || null;
  const money = queryParams.get("Price") || null;
  const address = queryParams.get("Address")?.replace(/_/g, " ") || null;
  const category = queryParams.get("category") || null;


  const { data: faveritedata, isLoading, isSuccess } = useGetFavoriteQuery();
  // // Kiểm tra pathname của location để quyết định khi nào hiển thị GridCart


  return (
    <div className="w-[1360px] flex flex-col gap-5 mb-20">


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
