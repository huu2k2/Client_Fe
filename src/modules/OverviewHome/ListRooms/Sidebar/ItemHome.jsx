import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import ModalLock from "./ModalLock";
const ItemHome = ({ item }) => {
  const navigate = useNavigate();
  const [isLock, setIsLock] = useState(item.isExclusive);
  const handleClick = () => {
    if (isLock) {
    } else {
      navigate(`/overview/${item.houseId}`);
    }
  };

  return (
    <label
      onClick={handleClick}
      htmlFor={!isLock && "my-drawer-Overview"}
      aria-label={!isLock && "close sidebar"}
      className="drawer-overlay"
    >
      <div className="card w-full bg-base-100 shadow-sm border mb-1 hover:bg-rose-50 cursor-pointer hover:">
        <div className="card-body flex justify-between">
          <div>
            <h2 className="card-title font-bold">
              {item.houseName} ({item.roomEmptyTotal}){" "}
              {isLock && <AiFillLock />}
            </h2>
            <p>{item.houseAddress}</p>
          </div>
        </div>
      </div>
      <ModalLock setIsLock={setIsLock} item={item} />
    </label>
    // </Link>
  );
};

export default ItemHome;
