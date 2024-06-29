import React from "react";
import { useLocation, useParams } from "react-router-dom";
import GridCart from "../GridCart";
import SimilarRoom from "../GridCart/SimilarRoom";

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idroom = queryParams.get("idRoom") || null;
  const money = queryParams.get("Price") || null;
  const address = queryParams.get("Address")?.replace(/_/g, " ") || null;

  // // Kiểm tra pathname của location để quyết định khi nào hiển thị GridCart
  // const showGridCart = location.pathname === '/';
  const showRoomLike = location.pathname === "/danh_sach_phong_yeu_thich";
  return (
    <div className="w-[1360px] flex flex-col gap-5 mb-20">
      {showRoomLike && (
        <h1 className="font-semibold text-2xl">Danh sách phòng yêu thích</h1>
      )}
      <GridCart id={idroom} money={money} address={address} />
    </div>
  );
};

export default Index;
