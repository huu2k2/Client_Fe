import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logo from '../../../assets/logo1.png';

const Index = () => {
  const { idHome } = useParams();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(0); // State để lưu trạng thái của liên kết được chọn

  useEffect(() => {
    if (location.pathname.includes('policies')) {
      setActiveLink(1);
    } else if (location.pathname.includes('booking')) {
      setActiveLink(2);
    } else if (location.pathname.includes('deposit')) {
      setActiveLink(3);
    } else {
      setActiveLink(0);
    }
  }, [location.pathname]);

  // Hàm xử lý khi click vào một liên kết
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-full h-16 bg-black justify-between items-center flex flex-col">
      <div className="grow shrink basis-0 self-stretch px-[280px] justify-start items-center gap-[738px] flex">
        <div className="justify-start items-center gap-6 flex">
          <div className="w-fit h-6 pr-[0.48px] justify-center items-center flex">
            <Link to={'/'} className="w-[134.52px] h-6 relative">
              <img className="w-full h-full" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="justify-start items-start gap-4 flex">
            {/* Sử dụng Link cho các liên kết và điều chỉnh CSS dựa trên activeLink */}
            <Link
              to={`/overview/${idHome}`}
              className={`px-3 cursor-pointer py-2 rounded-md justify-start items-center flex ${
                activeLink === 0 ? 'bg-rose-700' : ''
              }`}
              onClick={() => handleLinkClick(0)}
            >
              <p className="text-white text-sm font-medium  leading-tight">
                Danh sách phòng trống
              </p>
            </Link>
            <Link
              to={`/overview/${idHome}/policies`}
              className={`px-3 cursor-pointer py-2 rounded-md justify-start items-center flex ${
                activeLink === 1 ? 'bg-rose-700' : ''
              }`}
              onClick={() => handleLinkClick(1)}
            >
              <p className="text-white text-sm font-medium  leading-tight">Chính sách</p>
            </Link>
            <Link
              to={`/overview/${idHome}/booking`}
              className={`px-3 cursor-pointer py-2 rounded-md justify-start items-center flex ${
                activeLink === 2 ? 'bg-rose-700' : ''
              }`}
              onClick={() => handleLinkClick(2)}
            >
              <p className="text-white text-sm font-medium  leading-tight">Đặt lịch dẫn khách</p>
            </Link>
            {/* <Link
              to={`/overview/${idHome}/deposit`}
              className={`px-3 cursor-pointer py-2 rounded-md justify-start items-center flex ${
                activeLink === 3 ? 'bg-rose-700' : ''
              }`}
              onClick={() => handleLinkClick(3)}
            >
              <p className="text-white text-sm font-medium  leading-tight">Đặt cọc giữ chỗ</p>
            </Link> */}
          </div>
        </div>
      </div>
      <div className="w-[1360px] h-px bg-zinc-700" />
    </div>
  );
};

export default Index;
