import React, { useState } from "react";
import Cart from "./Cart";
import ContainerImg from "./ContainerImg";

const groupByFloor = (data) => {
  return data?.reduce((acc, item) => {
    const floorNumber = item.floor
    if (!acc[floorNumber]) {
      acc[floorNumber] = [];
    }
    acc[floorNumber].push(item);
    return acc;
  }, {});
};

const Floor = ({ data }) => {
  const groupedData = groupByFloor(data || []);
  const [imgdata, setImgdata] = useState([]);
  const [getIdRoom,setIdRoom] = useState('')
  const ClickCart = (item) => {
    document.getElementById("my_modal_showimg").showModal();
    setImgdata(item);
  };
 
  return (
    <div className="flex-col w-full justify-start items-start gap-8 flex">
      {Object.keys(groupedData).map((floorNumber) => (
        <div
          key={floorNumber}
          className="self-stretch h-fit flex-col justify-start items-start gap-6 flex"
        >
          <div className="self-stretch h-6 flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-gray-900 text-lg font-medium leading-normal">
              Tầng {parseInt(floorNumber) === 0 ? "G" : floorNumber}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {/* Start card */}
            {groupedData[floorNumber].map((item, index) => (
              <>
                <div onClick={()=>ClickCart(item)}>
                  <Cart key={item.id || index} data={item} />
                </div>
              </>
            ))}
            <ContainerImg item={imgdata} data={imgdata}/>
            {/* End card */}
          </div>

          <div className="self-stretch h-px flex-col justify-start items-start flex">
            <div className="self-stretch h-px bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Floor;
