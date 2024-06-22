import ImgHome from "../../assets/notfound.png";

import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
const APP_URL_IMAGE = import.meta.env.VITE_APP_URL_IMAGE;

const index = ({ item }) => {
  const img = item.image ? `${APP_URL_IMAGE}/${item.image}` : null;
  const [isHeart, setIsHeart] = useState(false);
  const [isShow, setShow] = useState(false);
 console.log(item)
  return (
    <div className="w-[328px] h-fit gap-2 flex flex-col justify-between">
      <div className="relative flex justify-center items-center">
        <Link to={`/detail/${item.houseId}/room/${item.roomId}`}>
          <img
            src={img ? img : ImgHome}
            alt="Images home"
            className="h-[185px]"
          />
        </Link>
        <span className="absolute top-2 left-2 text-white rounded-2xl font-normal text-sm bg-red-700 py-1 px-2">
          Ưu đãi
        </span>
        <span
          onClick={() => setIsHeart(!isHeart)}
          className={`absolute right-2 top-2 cursor-pointer rounded-2xl w-7 h-7 flex justify-center items-center ${
            isHeart ? "bg-red-700" : "bg-white"
          } hover:bg-red-700 transition-colors duration-300 text-white`}
        >
          <AiOutlineHeart
            className={isHeart ? "text-white" : "text-gray-700"}
          />
        </span>
      </div>

      <div className="w-full h-fit flex flex-col justify-start gap-1">

        <div className="w-fit h-5 rounded-2xl py-[2px] px-2 bg-red-100 text-red-700 gap-2 ">
          <p className="font-normal text-sm">
            {item.category ? item.category : "Studio"}
          </p>
        </div>

        <div className="w-full h-6 text-black ">
          <p className="font-medium text-base truncate overflow-hidden whitespace-nowrap uppercase">
          {item.address.split(',')[0].toUpperCase()}
          </p>
        </div>

        <div className="w-full h-5 text-gray-400 flex gap-2 items-center py-1">
          <BsGeoAlt />{" "}
          <span className="truncate max-w-full">{item.address.split(',')[1]+','+ item.address.split(',')[2]}</span>
        </div>

        <div
          className="w-fit h-7 rounded-2xl py-[2px]  gap-2 relative cursor-pointer flex items-center"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {item.sampleRoomCodes.length > 0 && isShow && (
            <div className="min-w-fit w-[224px] max-h-[200px] overflow-y-auto bg-white absolute bottom-5 left-[100px] flex flex-col justify-start rounded-lg border-2">
              <div className="w-full gap-1 flex flex-col justify-center items-start px-4">
                {item.sampleRoomCodes.map((i, index) => (
                  <span
                    className="text-sm font-normal text-gray-700 w-full h-9 py-1 flex items-center"
                    key={index}
                  >
                    P.{i}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p
            className={`font-normal text-sm px-2 py-1 gap-1 rounded-xl rounded${
              item.status === "0"
                ? "text-[#2563eb]  bg-[#EFF6FF]"
                : "text-[#D97706]  bg-[#FFFBEB]"
            }`}
          >
            {item.status === "0" ? "Phòng trống:" : "Phòng sắp trống:"}{" "}
            <span className="text-black"> {item.emptyRoomTotal}</span>
          </p>
        </div>

        <div className="w-full h-6 text-black ">
            {new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ 
        </div>
      </div>
    </div>
  );
};

export default index;
