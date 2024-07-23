import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalLock = ({ setIsLock,item }) => {
  const [getText, setText] = useState("");
  const closeRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    // Thực hiện logic kiểm tra mật khẩu ở đây nếu cần
    setIsLock(true);
    navigate(`/overview/${item.houseId}`);
    if (closeRef.current) {
      closeRef.current.close();
    }
  };

  return (
    <>
      <dialog   className="modal" ref={closeRef}>
        <div className="modal-box flex flex-col gap-2">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h1 className="font-bold">Nhập mật khẩu để mở khóa</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập mật khẩu..."
              className="input outline-none w-full max-w-xs"
              onChange={(e) => setText(e.target.value)}
            />
            
            <button className="btn" onClick={handleClick}>
              Nhập
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalLock;
