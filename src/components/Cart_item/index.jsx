import React, { useState, useEffect } from "react";
import { IoMdHeart } from "react-icons/io";
import { BsGeoAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoriteQuery,
} from "@apis/slice/Agencies";
import ImgHome from "../../assets/notfound(1).png";

const Index = ({ item, faveritedata }) => {

  const img = item.image || ImgHome;
  const [isHeart, setIsHeart] = useState(false);
  const [isShow, setShow] = useState(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { refetch } = useGetFavoriteQuery();

  useEffect(() => {
    if (faveritedata && faveritedata.response) {
      const isFavorite = faveritedata.response.some(
        (favItem) => favItem.roomId === item.roomId
      );
      setIsHeart(isFavorite);
    }
  }, [faveritedata, item.roomId]);

  const handleFavoriteClick = async () => {

    // if ()
    if (isHeart) {
      await removeFavorite(item.roomId);
    } else {
      await addFavorite(item.roomId);
    }
    setIsHeart(!isHeart);
    refetch();
  };

  return (
    <div className="w-[328px] h-fit gap-2 flex flex-col justify-between">
      <div className="relative flex justify-center items-center rounded-lg">
        <Link
          to={`/detail/${item?.houseId}/room/${item?.roomId}`}
          className="w-[328px] h-[185px] rounded-lg overflow-hidden"
        >
          <img
            src={img}
            alt="Images home"
            className="h-full w-full object-cover bg-[#0000001c]"
          />
        </Link>
        <div className="w-[53px] h-5 px-2 py-0.5 bg-rose-600 rounded-2xl backdrop-blur-[28px] flex justify-center items-center gap-2 absolute top-2 left-2">
          <span className="text-white text-xs font-normal leading-none h-4 flex justify-center items-center">
            Ưu đãi
          </span>
        </div>

        <span
          onClick={handleFavoriteClick}
          className={`absolute right-2 top-2 cursor-pointer w-7 h-7 rounded-full flex justify-center items-center active:bg-gray-300 bg-white group transition-colors`}
        >
          <IoMdHeart
            className={`${isHeart ? "text-red-500" : "text-[#d1d1d1]"
              } hover:text-red-500 group-hover:text-red-500 flex justify-center items-center`}
          />
        </span>
      </div>

      <div className="w-full h-fit flex flex-col justify-start gap-1">
        <div
          className={`w-fit h-5 rounded-2xl py-[2px] px-2 ${item.category ? "bg-red-100" : "bg-white"
            } text-red-700 gap-2 flex justify-center items-center`}
        >
          <span className="font-normal text-sm flex justify-center items-center">
            {item.category}
          </span>
        </div>

        <div className="w-full h-6 text-black truncate">
          <span className="text-neutral-800  text-base font-medium leading-normal truncate overflow-hidden whitespace-nowrap uppercase ">
            {item.houseName}
          </span>
        </div>

        <div className="w-full h-5 text-neutral-500 text-sm font-normal leading-tight flex gap-2 items-center py-1">
          <BsGeoAlt />{" "}
          <span className="truncate max-w-full">
            {item.address.split(",")[0]},{item.address.split(",")[1]}
          </span>
        </div>

        <div
          className="w-fit h-7 rounded-2xl py-[2px] gap-2 relative cursor-pointer flex items-center"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {item.sampleRoomCodes.length > 0 && isShow && (
            <div className="min-w-fit w-[224px] max-h-[200px] overflow-y-auto bg-white absolute bottom-5 left-[100px] flex flex-col justify-start rounded-lg border-2 custom-scrollbar">
              <div className="w-full gap-1 flex flex-col justify-center items-start px-4">
                {item.sampleRoomCodes.map((code, index) => (
                  <span
                    className="text-sm font-normal text-gray-700 w-full h-9 py-1 flex items-center"
                    key={index}
                  >
                    P.{code}
                  </span>
                ))}
              </div>
            </div>
          )}

          <span
            className={`font-normal text-sm px-2 py-1 gap-1 rounded-xl ${item.status === "0"
              ? "text-[#2563eb] bg-[#EFF6FF]"
              : "text-[#D97706] bg-[#FFFBEB]"
              }`}
          >
            {item.status === "0" ? "Phòng trống:" : "Phòng sắp trống:"}{" "}
            <span className="text-black">{item.emptyRoomTotal}</span>
          </span>
        </div>

        <div className="w-full h-6 text-neutral-800 text-base font-medium leading-normal">
          {new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ
        </div>
      </div>
    </div>
  );
};

export default Index;
