import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { usePostVeriPWMutation } from "../../../../apis/slice/Houses";
import { toast } from "react-toastify";
import ImgLock from  '../../../../assets/lock.png'
const ItemHome = ({ item }) => {
  const navigate = useNavigate();
  const [isLock, setIsLock] = useState(item.isExclusive);
  const [isOpen, setIsOpen] = useState(false);
  const [getText, setText] = useState("");
  const handleClick = () => {
    if (isLock) {
      setIsOpen(!isOpen);
    } else {
      navigate(`/overview/${item.houseId}`);
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const [postVeriPW] = usePostVeriPWMutation();
  const handleEnter = async () => {

    try {
      if(!getText){
        toast.error('Bạn Chưa Nhập Mật khẩu!');
        return
      }
      const kq = await postVeriPW({
        houseId: item.houseId,
        housePass: getText.trim(),
      }).unwrap();
      console.log(kq);
      if (kq.statusCode === 200 && kq.response) {
        setIsLock(false);
      
        toast.success('Nhập password thành công!');
       
      } else {
        toast.error('Nhập password thất bại!');
      }
      setIsOpen(!isOpen);
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  return (
    <div className={`h-fit bg-base-200`}>
      <label
        onClick={handleClick}
        htmlFor={!isLock && "my-drawer-Overview"}
        aria-label={!isLock && "close sidebar"}
        className={`drawer-overlay ${isLock && "collapse-title p-0"}`}
      >
        <div className="card w-full bg-base-100 shadow-sm border mb-1 hover:bg-rose-50 cursor-pointer hover:">
          <div className="card-body flex justify-between">
            <div>
              <h2 className="card-title font-bold">
                {item.houseName} ({item.roomEmptyTotal}){" "}
                {isLock && <img src={ImgLock} className="w-5 h-5"/>}
              </h2>
              <p>{item.houseAddress}</p>
            </div>
          </div>
        </div>
      </label>
      {isOpen && (
        <div
          className={`px-[13px] w-full h-20 flex justify-start items-center gap-2 `}
        >
          <input
            type="text"
            placeholder="Nhập mật khẩu..."
            className="input  w-full max-w-2xl"
            onChange={handleChange}
          />
          <button
            className="btn text-white bg-rose-500 hover:bg-rose-500"
            onClick={handleEnter}
          >
            Nhập
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemHome;
