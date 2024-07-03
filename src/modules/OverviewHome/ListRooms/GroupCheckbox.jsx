import React, { useState, useEffect } from "react";

const GroupCheckbox = ({ query, setQuery, statusTotals }) => {
  const [isEmptyRoomChecked, setIsEmptyRoomChecked] = useState(false);
  const [isRoomToBeEmptyChecked, setIsRoomToBeEmptyChecked] = useState(false);
  const [isBookedRoomChecked, setIsBookedRoomChecked] = useState(false);

  useEffect(() => {
    const updatedQuery = [];

    if (isEmptyRoomChecked) {
      updatedQuery.push('0');
    }

    if (isRoomToBeEmptyChecked) {
      updatedQuery.push('1');
    }

    if (isBookedRoomChecked) {
      updatedQuery.push('2');
    }

    setQuery(updatedQuery);
  }, [isEmptyRoomChecked, isRoomToBeEmptyChecked, isBookedRoomChecked]);

  const handleEmptyRoomChange = () => {
    setIsEmptyRoomChecked(!isEmptyRoomChecked);
  };

  const handleRoomToBeEmptyChange = () => {
    setIsRoomToBeEmptyChecked(!isRoomToBeEmptyChecked);
  };

  const handleBookedRoomChange = () => {
    setIsBookedRoomChecked(!isBookedRoomChecked);
  };

  return (
    <div className="self-stretch h-5 flex-col justify-center items-start gap-2 flex">
      <div className="justify-start items-center gap-4 inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <input
            type="checkbox"
            className="custom-checkbox bg-white"
            checked={isEmptyRoomChecked}
            onChange={handleEmptyRoomChange}
          />
          <div className="text-white text-sm font-medium leading-tight">
            Phòng trống ({statusTotals?.empty})
          </div>
        </div>
        <div className="justify-start items-center gap-2 flex">
          <input
            type="checkbox"
            className="custom-checkbox bg-white"
            checked={isRoomToBeEmptyChecked}
            onChange={handleRoomToBeEmptyChange}
          />
          <div className="text-white text-sm font-medium leading-tight">
            Sắp trống ({statusTotals?.toBeEmpty})
          </div>
        </div>

        <div className="justify-start items-center gap-2 flex">
          <input
            type="checkbox"
            className="custom-checkbox bg-white"
            checked={isBookedRoomChecked}
            onChange={handleBookedRoomChange}
          />
          <div className="text-white text-sm font-medium leading-tight">
            Đã đặt cọc ({statusTotals?.booked})
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCheckbox;
