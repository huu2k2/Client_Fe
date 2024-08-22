import React, { useRef, useState } from "react";
import { useGetImagesQuery } from "../../../apis/slice/ImageOfRoom";
import ListImg from "./ListImg";
import { Link, useParams } from "react-router-dom";
import { ModalPutRoom } from "@components/Modal";
import { useBooleanIsShowModal } from "@customhooks";
import { Helmet } from "react-helmet";
import { AiFillCopy, AiOutlineCheck } from "react-icons/ai";
const ContainerImg = ({ item, data }) => {
  const { idHome } = useParams();
  const [isShowModal, setIsShowModal, dropdownRef] = useBooleanIsShowModal();
  const [isCopied, setIsCopied] = useState(false);
  const refDialog = useRef(null);
  const { data: images } = useGetImagesQuery(item.roomId);
  const handleClick = () => {
    document.getElementById("my_modal_showimg").close();
    setIsShowModal(!isShowModal);
  };
  const handleCheckOutSide = (event) => {
    if (refDialog.current && !refDialog.current.contains(event.target)) {
      document.getElementById("my_modal_showimg").close();
    }
  };
  
  const handleCopyLink = () => {
    const url = `http://aloper.fun:82/overview/${idHome}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true); // Đổi trạng thái thành công khi sao chép
      setTimeout(() => setIsCopied(false), 2000); // Sau 2 giây, trở về biểu tượng sao chép ban đầu
    }).catch((err) => {
      console.error('Không thể sao chép link: ', err);
    });
  };
  return (
    <>
      <Helmet>
        {/* Meta cơ bản */}
        <title>Danh sách phòng trống</title>
        <meta name="description" content="Danh sách phòng trống" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={`Phòng P.${item.roomCode}`} />
        <meta property="og:description" content="Phòng trọ giá rẻ tại Aloper" />
        <meta property="og:image" content={images?.response[0].url} />
        <meta
          property="og:url"
          content={"http://aloper.fun:82/overview/" + idHome}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <dialog
        id="my_modal_showimg"
        className="modal my-5 "
        onClick={handleCheckOutSide}
      >
        <div className="modal-box w-11/12 max-w-7xl h-fit" ref={refDialog}>
          <h3 className="font-bold text-lg">Phòng P.{item.roomCode}</h3>
          <p className="py-4">
            Giá: {Intl.NumberFormat("vi-VN").format(item?.price)} VNĐ
          </p>

          <ListImg images={images} />

          <div className="modal-action  h-fit flex justify-end items-center gap-2">
            <button className="btn bg-rose-600 text-white hover:bg-rose-500" onClick={handleCopyLink}>
            {isCopied ?<> <AiOutlineCheck className="w-6 h-6" /> Đã sao chép</>: <><AiFillCopy className="w-6 h-6" /> Sao chép link</>}
              
            </button>
            {data.status !== "2" ? (
              <button
                className="btn bg-rose-600 text-white hover:bg-rose-500"
                onClick={handleClick}
              >
                Đặt lịch xem phòng
              </button>
            ) : (
              <></>
            )}

            <Link
              to={"/quan_ly_lich_hen"}
              className="btn bg-rose-600 text-white hover:bg-rose-500"
            >
              Đặt cọc
            </Link>
          </div>
        </div>
      </dialog>

      {isShowModal && (
        <ModalPutRoom
          dropdownRef={dropdownRef}
          setIsShowModal={setIsShowModal}
          roomId={item.roomCode}
          id={item.houseId}
        />
      )}
    </>
  );
};

export default ContainerImg;
