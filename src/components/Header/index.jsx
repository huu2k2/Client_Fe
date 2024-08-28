import { Link } from "react-router-dom";
import ImgLogo from "@assets/logo1.png";
import ImgAvatar from "@assets/Avatar.png";
import { BsBell } from "react-icons/bs";
import { useClickRemoveFilter } from "../../customHooks/FilterCustomHook";
import { FaFileContract } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
const GroudButton = () => {
  return (
    <div className="h-full flex gap-2">
      <Link to={"/login"}>
        <button className="py-[9px] px-[17px] rounded-[6px] bg-[#FFE2E5] shadow-sm text-red-700 text-sm leading-5 font-medium">
          Đăng nhập
        </button>
      </Link>
      <Link to={"/register"}>
        <button className="py-[9px] px-[17px] rounded-[6px] bg-red-700 shadow-sm text-white text-sm leading-5 font-medium">
          Đăng ký
        </button>
      </Link>
    </div>
  );
};

const index = ({ isShow = null, setShow = null }) => {
  const handleRemoveFilter = useClickRemoveFilter();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.assign("/login");
  };

  const handleLinkClick = (event) => {
    handleRemoveFilter();
    window.location.assign("/");
  };

  return (
    <div className=" px-10 md:px-0 w-full h-[64px] bg-black flex justify-center items-center grow shrink m">
      <div className="w-full lg:w-[1360px] px-2 h-full flex justify-between items-center">
        <div onClick={handleLinkClick}>
          <img
            src={ImgLogo}
            alt="Logo"
            className="w-[135px] h-[24px] cursor-pointer"
          />
        </div>

        <div className="w-[316px] h-[38px] gap-6 flex items-center justify-end">
          {/* info */}

          {sessionStorage.getItem("token") ? (
            <>
              <div className="w-fit h-full gap-3 flex items-center">
                <div className="p-[7px] cursor-pointer">
                  <BsBell color="white" size={24} />
                </div>

                <Link
                  to={"/quan_ly_lich_hen"}
                  className="p-[7px] cursor-pointer"
                >
                  <BsCalendar2Date className="bg-white rounded w-6 h-6" />
                </Link>
                <Link
                  to={"/quan_ly_hop_dong"}
                  className="p-[10px] cursor-pointer "
                >
                  <FaFileContract className="text-white rounded w-6 h-6" />
                </Link>
              </div>
              <div className="group relative dropdown dropdown-end">
                {/* Avatar */}
                <div
                  tabIndex={0}
                  role="button"
                  className="w-8 h-8 rounded-2xl overflow-hidden"
                >
                  <img
                    src={ImgAvatar}
                    alt="img avatar"
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-lg w-52 mt-3"
                  >
                    <li
                      onClick={() => setShow(!isShow)}
                      className="cursor-pointer text-base"
                    >
                      <span>Thông tin tài khoản</span>
                    </li>
                    <li className="cursor-pointer text-base">
                      <Link to={"/danh_sach_phong_yeu_thich"}>Yêu thích</Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="cursor-pointer text-base"
                    >
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : <GroudButton/>}
        </div>
      </div>
    </div>
  );
};

export default index;
