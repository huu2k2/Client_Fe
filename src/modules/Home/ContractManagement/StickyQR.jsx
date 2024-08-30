import { RiQrScan2Line } from "react-icons/ri";
const StickyQR = () => {
  return (
    <div className="absolute">
    <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-red-600 border-l-[47px] border-l-transparent  text-white text-center"></div>
    <div className="absolute top-[13px] left-[20px] transform translate-x-1/4 -translate-y-1/2 rotate-[0deg] text-white text-center">
      <RiQrScan2Line  className="font-bold"/>
    </div>
  </div>
  )
}

export default StickyQR;