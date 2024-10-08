import UserImg from "@assets/user.png";
import { BsFillPersonPlusFill } from "react-icons/bs";

import { useEffect, useState } from "react";

import { useGetHolder } from "@customhooks";
import { Link, useParams } from "react-router-dom";
import { useGetImagesQuery } from "@apis/slice/ImageOfRoom";
import ShowImages from "../../../../components/ShowImages";
const API_URL = import.meta.env.VITE_APP_URL_IMAGE;
import { useGetAllDetailQuery } from '@apis/slice/services';
import { useGetInfoItem } from './../../../../customHooks/ServicesCustomHook';
import { Skeleton } from "@mui/material";

const Cart = () => {
  const [holder, rooms] = useGetHolder();
  const { id, roomId } = useParams();
  const { data: images, error, isLoading } = useGetImagesQuery(roomId);
  const [display, setDisplay] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [address, price, address2] = useGetInfoItem();
  const { data } = useGetAllDetailQuery(roomId);

  useEffect(() => {
    if (images?.response?.length < 2) {
      setDisplay(" hidden");
    } else {
      setDisplay(" block");
    }

    if (images?.response) {
      const filteredImages = images.response.filter((_, index) => index < 3);
      setResult(filteredImages);
    }
  }, [images]);

  return (
    <>
      <div className="w-full h-fit xl:hidden">
        {address && data ? (
          <>
            <h1 className="nthd_semibold_2xl_text truncate w-[730px] ">{data?.response?.houseName} </h1>
            <p>{address2}</p>
          </>
        ) : (
          <Skeleton height={32} variant="rounded" />
        )}
      </div>
      <div className="w-full px-10 md:px-0 md:w-[557px] h-fit gap-2 flex flex-col flex-wrap">

        <div className="hidden md:block w-full h-[313px]">
          <img
            src={result[mainImageIndex]?.url}
            alt="Slide 1"
            className="overflow-hidden object-cover w-[557px] h-[313px] rounded-lg"
          />
        </div>

        <div className="w-full h-fit md:h-[102px] gap-2 relative flex flex-row flex-wrap">
          {result.map((image, index) => (
            <div
              key={index}
              className="w-full md:w-[180px] h-[200px] md:h-full rounded-md overflow-hidden cursor-pointer"
            >
              <img
                src={image?.url}
                onClick={() => setMainImageIndex(index)}
                alt={`Image ${index + 1}`}
              />
              {index === 2 && (
                <div
                  onClick={() =>
                    document.getElementById("mymodalshowanh").showModal()
                  }
                  className={`w-full h-[200px] md:w-[180px] md:h-[102px] rounded-md overflow-hidden absolute  bottom-0 md:top-0 right-0 bg-black translate-x-[-1px] bg-opacity-60 cursor-pointer ${display}`}
                >
                  <div className="absolute top-0 bottom-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50">
                    <span className="text-white">Xem tất cả hình ảnh</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <ShowImages images={images} />

        <div className="flex-col md:flex-row nthd_flex_between_full h-fit pt-8">
          <div className="w-full md:w-[196px] h-fit gap-6 flex flex-col">
            <div className="nthd_flex_between_full">
              <Link to={`/overview/${id}`}>
                <img src={UserImg} alt="hinh anh nguoi dung..." />
              </Link>
              <div>
                <h1 className="nthd_text_normal_lg">{holder?.fullName}</h1>
                <span className="nthd_text_normal_sm">Chủ nhà</span>
              </div>
            </div>

            <div className="w-full rounded-lg border px-[9px] py-[17px] gap-2 nthd_text_medium_sm text-gray-700 nthd_flex">
              <BsFillPersonPlusFill />
              <span>Theo dõi</span>
            </div>
          </div>

          <div className="md:w-[288px] h-[76px] nthd_flex_between">
            <div className="md:w-[136px] h-full p-2 gap-2 flex flex-col justify-between items-center">
              <h2 className="nthd_text_normal_sm_text">Phòng sắp trống</h2>
              <h1 className="nthd_semibold_2xl_text">{rooms?.roomToBeEmpty}</h1>
            </div>

            <div className="border border-gray-400 h-[40px] bg-[#E7E7E7]"></div>

            <div className="md:w-[136px] h-full p-2 gap-2 flex flex-col justify-between items-center">
              <h2 className="nthd_text_normal_sm_text">Phòng trống</h2>
              <h1 className="nthd_semibold_2xl_text">{rooms?.emptyRoom}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
