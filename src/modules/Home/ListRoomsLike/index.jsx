import React from "react";
import CartRoom from "../../../components/Cart_item/index";
import ListCartHome from "@components/ListCartHome";
import { useGetFavoriteQuery } from "../../../apis/slice/Agencies";

const HomePage = () => {
  const { data: faveritedata, isLoading, isSuccess } = useGetFavoriteQuery();
  return (

    <div className="w-full h-fit flex justify-center items-center ">
      <div className="w-[1360px] flex flex-col gap-5 my-20">
        <h1 className="font-semibold text-2xl">Danh sách phòng yêu thích</h1>
        <div className="w-full grid grid-cols-4 gap-4 gap-y-[56px] relative min-h-[400px] max-h-fit ">
          {faveritedata?.response?.length > 0 ? (
            faveritedata?.response?.map((item, index) => <CartRoom key={index} item={item} faveritedata={faveritedata} />)
          ) : (
            !isLoading && (
              <div className="w-full absolute top-0 flex justify-center items-center">
                <p className="text-rose-500">Chưa có phòng yêu thich!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>

  );
};

export default HomePage;
