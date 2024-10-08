import React from "react";
import IMGICON from "../../../assets/CheckCircle.png";
const BasicInterior = ({ data }) => {
  return (
    <div className="w-full self-stretch h-fit bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium leading-normal">
          Nội thất cơ bản
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="w-full self-stretch h-fit flex-col justify-center items-center flex">
        {data &&
          data?.furnitures?.map((i, index) => (
            <div key={index} className="w-full">
            <div className="w-full lg:w-[1312px] h-[60px] px-6 py-5 justify-start items-center gap-2 inline-flex flex-wrap" >
              <img src={IMGICON} alt="" className="w-5 h-5 relative" />
              <div className="w-fit grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
                {i.furnitureName}
              </div>
              <div className="w-fit lg:w-[843px] text-gray-900 text-sm font-normal leading-tight">
                {i.price ?`${i.price.toLocaleString()} đ/tháng`:'Trang bị sẵn'}
              </div>
            </div>
            <div className={`self-stretch h-px bg-gray-200 ${data?.services?.length ===index+1 ?'hidden':''}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BasicInterior;
