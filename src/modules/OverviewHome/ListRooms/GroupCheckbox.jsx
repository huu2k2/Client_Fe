import React, { useState, useEffect } from "react";

const GroupCheckbox = ({ query, setQuery, rooms }) => {
  const [isEmptyRoomChecked, setIsEmptyRoomChecked] = useState(false);
  const [isRoomToBeEmptyChecked, setIsRoomToBeEmptyChecked] = useState(false);

  useEffect(() => {
    const updatedQuery = [];

    if (isEmptyRoomChecked) {
      updatedQuery.push('0');
    }

    if (isRoomToBeEmptyChecked) {
      updatedQuery.push('1');
    }

    setQuery(updatedQuery);
  }, [isEmptyRoomChecked, isRoomToBeEmptyChecked]);

  const handleEmptyRoomChange = () => {
    setIsEmptyRoomChecked(!isEmptyRoomChecked);
  };

  const handleRoomToBeEmptyChange = () => {
    setIsRoomToBeEmptyChecked(!isRoomToBeEmptyChecked);
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
            Phòng trống ({rooms?.emptyRoom})
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
            Sắp trống ({rooms?.roomToBeEmpty})
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCheckbox;
