import ImgHome from "../../assets/cartImg.png";

import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
const APP_URL_IMAGE = import.meta.env.VITE_APP_URL_IMAGE;

const index = ({ item }) => {
  const img = item.image ? ` ${APP_URL_IMAGE}/ImageRoom/${item.image}` : null;
  const [isHeart, setIsHeart] = useState(false);
  const [isShow, setShow] = useState(false);
 
  return (
    <div className="w-[328px] h-[325px] gap-2 flex flex-col justify-between">
      {img ? (
        <div className="relative flex justify-center items-center">
          <Link to={`/detail/${item.houseId}/room/${item.roomId}`}>
            <img src={img} alt="Images home" className="h-[185px]" />
          </Link>
          <span className="absolute top-2 left-2 text-white rounded-2xl font-normal text-sm bg-red-700 py-1 px-2">
            Ưu đãi
          </span>
          <span
            onClick={() => setIsHeart(!isHeart)}
            className={`absolute right-2 top-2 cursor-pointer  rounded-2xl w-7 h-7 flex justify-center items-center ${
              isHeart ? "bg-red-700" : "bg-white"
            }`}
          >
            {isHeart ? (
              <AiOutlineHeart className="  text-white" />
            ) : (
              <AiOutlineHeart className="text-gray-700" />
            )}
          </span>
        </div>
      ) : (
        <Link to={`/detail/${item.houseId}/room/${item.roomId}`} className="animate-pulse flex flex-col justify-start space-x-4">
          <div className="rounded-lg bg-gray-200 h-[185px] w-full"></div>
        </Link>
      )}

      <div className="w-full h-fit flex flex-col justify-between gap-1">
        <div className="w-fit h-5 rounded-2xl py-[2px] px-2 bg-red-100 text-red-700 gap-2 ">
          <p className="font-normal text-sm">{item.category ?item.category :'Studio' }</p>
        </div>
        <div className="w-full h-6 text-black ">
          <p className="font-medium text-base truncate overflow-hidden whitespace-nowrap uppercase">
            Mặt Tiền Đặng Văn Ngữ 4x16m 3 Tầng 2...
          </p>
        </div>

        <div className="w-full h-5 text-gray-400 flex gap-2 items-center">
          <BsGeoAlt /> <span className="truncate max-w-full">{item.address}</span>
        </div>

        <div
          className="w-fit h-5 rounded-2xl py-[2px] px-2  gap-2 relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {isShow && (
            <>
              <div className="w-[224px] h-fit bg-white gap-4 absolute bottom-7 left-24 p-4 flex flex-col justify-start rounded-lg border-2">
                <div className="  w-full h-5">
                  <span className="text-sm font-normal text-gray-700">
                    {item.roomCode}
                  </span>
                </div>
                 
              </div>
            </>
          )}
          <p className={`font-normal text-sm ${item.status==='0' ? 'text-[#2563eb]  bg-[#EFF6FF]':'text-[#D97706]  bg-[#FFFBEB]' }`}>
          {item.status==='0'?'Phòng trống:' :'Phòng sắp trống:' }  <span className="text-black"> {item.emptyRoomTotal}</span>
          </p>
        </div>

        <div className="w-full h-5 text-black">
          <span>
          {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ <span className="text-gray-400">/khách</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default index;
