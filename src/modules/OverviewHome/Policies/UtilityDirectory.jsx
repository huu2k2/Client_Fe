import { useEffect, useState } from "react";
import IMGICON from "../../../assets/CheckCircle.png";

const UtilityDirectory = ({ data }) => {
  const [HaveData, setIsHave] = useState([]);

  useEffect(() => {
    setIsHave([
      { name: 'Chỗ để xe', have: data?.parking },
      { name: 'Thang bộ', have: data?.stair },
      { name: 'Máy giặt chung', have: data?.washing },
      { name: 'Bảo vệ', have: data?.security },
      { name: 'WiFi', have: data?.wifi },
      { name: 'Thang máy', have: data?.elevator },
      { name: 'Vệ sinh hành lang', have: data?.hallwayCleaning },
      { name: 'Khoá vân tay', have: data?.fingerprintLock },
      { name: 'Giờ giấc tự do', have: data?.freeHours },
      { name: 'Dọn vệ sinh phòng', have: data?.cleanRoom },
      { name: 'Nuôi thú cưng', have: data?.pet },
      { name: 'Cammera an ninh', have: data?.camera },
    ]);
  }, [data]);

  return (
    <div className="self-stretch h-fit bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium leading-normal">
          Danh mục tiện ích
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch h-fit w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
        {HaveData.filter(i => i.have).map((i, index) => (
          <div className="w-fit h-fit lg:h-[60px] px-6 py-5 justify-start items-center gap-2 inline-flex " key={index}>
            <img src={IMGICON} alt="" className="w-5 h-5 relative" />
            <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
              {i.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilityDirectory;
