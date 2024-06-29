import UserImg from "@assets/user.png";
import { BsFillPersonPlusFill } from "react-icons/bs";
import cartImg from "@assets/cartImg.png";
import { useEffect, useState } from "react";
import SlideShow from "./SlideShow";
import { useGetHolder } from "@customhooks";
import { useParams } from "react-router-dom";
import { useGetImagesQuery } from "@apis/slice/ImageOfRoom";
import ShowImages from "../../../../components/ShowImages";
const API_URL = import.meta.env.VITE_APP_URL_IMAGE;
import index from './../../../Register/index';

const Cart = () => {
  const [holder, rooms] = useGetHolder();
  const { id, roomId } = useParams();
  const { data: images, error, isLoading } = useGetImagesQuery(roomId);
  const [display, setDisplay] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (images?.response?.length < 4) {
      setDisplay(" hidden");
    } else {
      setDisplay(" block");
    }

    if (images?.response) {
      const filteredImages = images.response.filter((_, index) => index < 3);
      setResult(filteredImages);
    }
  }, [images]);

  console.log("🚀 ~ Cart ~ images:", images);
  console.log("🚀 ~ Cart ~ result:", result);

  return (
    <>
      <div className="w-[557px] h-fit gap-2 flex flex-col ">

        <div className="w-full h-[313px]">
          <img
            src={result[mainImageIndex]?.url}
            alt="Slide 1"
            className="overflow-hidden object-cover w-[557px] h-[313px] rounded-lg"
          />
        </div>

        <div className="w-full h-[102px] gap-2 relative flex ">
          {result.map((image, index) => (
            <div
              key={index}
              className="w-[180px] h-[102px] rounded-md overflow-hidden"
            >
              <img
                src={image?.url}
                onClick={() => setMainImageIndex(index)}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}

          <div
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className={`w-[180px] h-[102px] rounded-md overflow-hidden absolute  right-0 bg-black translate-x-[-1px] bg-opacity-60 ${display}`}
          >

            <div className="absolute top-0 bottom-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50">
              <span className="text-white">Xem tất cả hình ảnh</span>
            </div>
          </div>
        </div>
        <ShowImages images={images} />

        <div className="nthd_flex_between_full h-fit pt-8">
          <div className="w-[196px] h-fit gap-6 flex flex-col">
            <div className="nthd_flex_between_full">
              <img src={UserImg} alt="hinh anh nguoi dung..." />
              <div>
                <h1 className="nthd_text_normal_lg">
                  {holder?.fullName}
                </h1>
                <span className="nthd_text_normal_sm">Chu nha</span>
              </div>
            </div>

            <div
              className="w-full rounded-lg border px-[9px] py-[17px] gap-2 nthd_text_medium_sm text-gray-700 nthd_flex"
            >
              <BsFillPersonPlusFill />
              <span>Theo doi</span>
            </div>
          </div>

          <div className="w-[288px] h-[76px] nthd_flex_between">
            <div className="w-[136px] h-full p-2 gap-2">
              <h2 className="nthd_text_normal_sm_text">Phong sap trong</h2>
              <h1 className="nthd_semibold_2xl_text">
                {rooms?.roomToBeEmpty}
              </h1>
            </div>

            <div className="border border-gray-400 h-[40px] bg-[#E7E7E7]"></div>

            <div className="w-[136px] h-full p-2 gap-2">
              <h2 className="nthd_text_normal_sm_text">Phong trong</h2>
              <h1 className="nthd_semibold_2xl_text">
                {rooms?.emptyRoom}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
