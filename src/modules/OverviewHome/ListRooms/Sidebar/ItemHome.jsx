import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const ItemHome = ({ item }) => {
    const navigate = useNavigate()
    const handleChange =()=>{
        navigate(`/overview/${item.houseId}`)
    }
  return (
    <label
    htmlFor="my-drawer-Overview"
    aria-label="close sidebar"
    className="drawer-overlay"
  >
      <div className="card w-full bg-base-100 shadow-sm border mb-1 hover:bg-rose-50 cursor-pointer hover:" onClick={handleChange}>
        <div className="card-body flex justify-between">
          <div>
            <h2 className="card-title">{item.houseName} ({item.roomEmptyTotal})</h2>
            <p>{item.houseAddress}</p>
            <span className="  text-rose-600 flex justify-start items-center">
              Tới quản lý nhà trọ
              <AiOutlineArrowRight className="w-5" />
            </span>
          </div>
        </div>
      </div>
      </label>
    // </Link>
  );
};

export default ItemHome;
