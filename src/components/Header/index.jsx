import { Link } from "react-router-dom";
import ImgLogo from "@assets/logo1.png";
import ImgAvatar from "@assets/Avatar.png";
import { BsBell } from "react-icons/bs";
import { useClickRemoveFilter } from "../../customHooks/FilterCustomHook";
import { FaFileContract } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import ItemNotification from "../ItemNotification";

const data = [
  {
    id: 1,
    type: "HUY",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    id: 2,
    type: "HETHAN",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    id: 3,
    type: "COCMOI",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    id: 4,
    type: "THUEMOI",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    id: 5,
    type: "HUY",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
];
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
              <div className="w-fit h-full gap-3 flex items-center z-[50]">
                <div className="p-[7px] cursor-pointer drawer drawer-end w-full">
                  <input
                    id="sidebarNotifications"
                    type="checkbox"
                    className="drawer-toggle"
                  />

                  <div className="drawer-content w-full">
                    {/* Page content here */}
                    <label
                      htmlFor="sidebarNotifications"
                      className="drawer-button "
                    >
                      {" "}
                      <BsBell color="white" size={24} />
                    </label>
                  </div>
                  <div className="drawer-side ">
                    <label
                      htmlFor="sidebarNotifications"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>

                    <ul className="menu  text-base-content min-h-full w-full md:w-[560px] px-5 bg-white  overflow-y-auto">
                      <div className="w-full h-[100px] p-6 bg-black flex-col justify-center items-start gap-1 inline-flex fixed top-0 right-0">
                        <div className="self-stretch justify-between items-center inline-flex">
                          <div className="text-white text-lg font-medium leading-7">
                            THÔNG BÁO
                          </div>
                          <div className="bg-zinc-600 rounded-md justify-center items-center flex"></div>
                        </div>
                      </div>
                     <div className="w-full  h-[100px]"></div>
                      <div className="w-full  h-full">
                        {data.map((item, index) => (
                          <ItemNotification key={index} item={item} />
                        ))}
                      </div>
                    </ul>
                  </div>
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
          ) : (
            <GroudButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
