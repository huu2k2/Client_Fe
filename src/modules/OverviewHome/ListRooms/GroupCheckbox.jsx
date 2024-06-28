import React from "react";

const GroupCheckbox = () => {
  return (
    <>
      <div className="self-stretch h-5 flex-col justify-center items-start gap-2 flex">
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <input type="checkbox" className="custom-checkbox  bg-white" />
            <div className="text-white text-sm font-medium font-['Inter'] leading-tight">
              Phòng trống(6)
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <input type="checkbox" className="custom-checkbox  bg-white" />
            <div className="text-white text-sm font-medium font-['Inter'] leading-tight">
              Sắp trống(0)
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <input type="checkbox" className="custom-checkbox  bg-white" />
            <div className="text-white text-sm font-medium font-['Inter'] leading-tight">
              Đã đặt cọc (0)
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <input type="checkbox" className="custom-checkbox bg-white" />
            <div className="text-white text-sm font-medium font-['Inter'] leading-tight">
              Đã cho thuê (3)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCheckbox;
