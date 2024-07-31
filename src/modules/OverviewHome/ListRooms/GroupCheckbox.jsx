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
             id="empty"
          />
          <label htmlFor="empty" className="text-white text-sm font-medium leading-tight cursor-pointer">
            Phòng trống ({statusTotals?.empty})
          </label>
        </div>
        <div className="justify-start items-center gap-2 flex">
          <input
            type="checkbox"
            className="custom-checkbox bg-white"
            checked={isRoomToBeEmptyChecked}
            onChange={handleRoomToBeEmptyChange}
            id="toBeEmpty"
          />
          <label htmlFor="toBeEmpty" className="text-white text-sm font-medium leading-tigh cursor-pointert">
            Sắp trống ({statusTotals?.toBeEmpty})
          </label>
        </div>

        <div className="justify-start items-center gap-2 flex">
          <input
            type="checkbox"
            className="custom-checkbox bg-white"
            checked={isBookedRoomChecked}
            onChange={handleBookedRoomChange}
            id="booked"
          />
          <label htmlFor="booked" className="text-white text-sm font-medium leading-tight cursor-pointer">
            Đã đặt cọc ({statusTotals?.booked})
          </label>
        </div>
      </div>
    </div>
  );
};

export default GroupCheckbox;
