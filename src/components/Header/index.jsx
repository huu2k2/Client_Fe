import { Link, useNavigate } from "react-router-dom";
import ImgLogo from "@assets/logo1.png";
import ImgAvatar from "@assets/Avatar.png";
import { BsBell, BsChatDots } from "react-icons/bs";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
const GroudButton = () => {
  return (
    <div className="h-full flex gap-2">
      <Link to={"/login"}>
        <button className="  py-[9px] px-[17px] rounded-[6px] bg-[#FFE2E5] shadow-sm text-red-700   text-sm leading-5 font-medium">
          Đăng nhập
        </button>
      </Link>
      <Link to={"/register"}>
        <button className="  py-[9px] px-[17px] rounded-[6px] bg-red-700 shadow-sm text-white  text-sm leading-5 font-medium">
          Đăng ký
        </button>
      </Link>
    </div>
  );
};

const index = ({ isShow, setShow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  const handleLogout =()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className="w-full h-[64px] bg-black flex justify-center items-center ">
      <div
        className="w-[1360px] 
       h-full flex justify-between items-center"
      >
        <Link to={"/"}>
          <img src={ImgLogo} alt="Logo" className="w-[135px] h-[24px]" />
        </Link>

        {/* div info login register */}

        <div className="w-[316px] h-[38px] gap-6 flex items-center">
          {/* info */}
          <div className="w-fit h-full gap-3  flex items-center ">
            <div className="p-[7px]">
              <BsBell color="white" size={24} />
            </div>
            <div className="p-[7px]">
              <BsChatDots color="white" size={24} />
            </div>
          </div>

          {localStorage.getItem("token") ? (
            <div className="group relative">
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShow(!isShow)}
              >
                <img src={ImgAvatar} alt="img avatar" />
              </div>

              {isHovered && (
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="z-10  absolute top-8  divide-y bg-black  divide-gray-100 rounded-lg shadow w-fit px-2 dark:bg-gray-700"
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li onClick={handleLogout}>
                      <span className="flex justify-start gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                        <FiLogOut size={24} color="white" /> Logout
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <GroudButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
