import { BsBell } from "react-icons/bs";
import ItemNotification from "../ItemNotification";
import { useEffect } from "react";
import { onMessageListener } from "../../helper/NotificationPermission";
import { toast } from "react-toastify";
import { useInfoOfNotification } from "../../customHooks";

const index = () => {
  const [dataInfo, setDataInfo, countInfo, setCountInfo] =
    useInfoOfNotification();
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.info("Message received: " + JSON.stringify(payload));
        console.log("Message payload: ", JSON.stringify(payload));
      })
      .catch((err) => console.error("Failed to receive message: ", err));
  }, []);
  const handleSeen=()=>{
    document.getElementById('sidebarNotifications').close()
    setCountInfo(0)
  }
  return (
    <div className="p-[7px] cursor-pointer drawer drawer-end w-full">
      <input
        id="sidebarNotifications"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content w-full">
        {/* Page content here */}
        <label htmlFor="sidebarNotifications" className="drawer-button ">
          <div className="relative">
            {countInfo > 0 && (
              <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-0">
                {countInfo}
              </span>
            )}

            <BsBell color="white" size={24} />
          </div>
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
          <div className="w-full h-[100px]"></div>
          <div className="w-full flex justify-end"><span className="text-rose-600 text-lg  font-bold cursor-pointer" onClick={handleSeen}>Đánh dấu là đã đọc</span></div>
          <div className="w-full  h-full">
            {dataInfo?.length > 0 &&
              dataInfo?.map((item, index) => (
                <ItemNotification key={index} item={item} />
              ))}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default index;
