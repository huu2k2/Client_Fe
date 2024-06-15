import { BsGiftFill } from "react-icons/bs";
import Button from "@components/Button";
import { useDataServices } from "../../../../customHooks";
import { useBooleanIsShowModal } from "@customhooks";
 
const InfoRoom = ( ) => {
  const [ furnitureInserts, serviceInserts ] = useDataServices();

   const [isShowModal,setIsShowModal] = useBooleanIsShowModal()
  const handleShowModal = () => {
    setIsShowModal(!isShowModal)
  };
  return (
    <>
      
      <div className="w-[723px] h-[578px] gap-4 flex flex-col ">
        {/* name home in stress */}
        <div className="w-full h-fit">
          <h1 className="nthd_semibold_2xl_text">Title</h1>
        </div>

        {/* endow  */}
        <div className="w-[723px] h-[96px] rounded-[4px] border p-2 gap-[102px] bg-[#FFFBEB] border-[#B45309] ">
          <div className="w-[707px] h-[80px] gap-2">
            {/* git  */}
            <div className="w-[82px] h-[24px] gap-2 flex">
              <BsGiftFill />
              <span className="font-medium text-base">Ưu đãi</span>
            </div>
            {/*gif content */}
            <div className="w-full h-[48px] gap-2 px-8 mt-2">
              <ul className="list-disc ">
                <li className="nthd_text_normal_sm_text2">
                  Chương trình sale áp dụng từ ngày 23/04/2024 - 23//05/2024
                </li>
                <li className="nthd_text_normal_sm_text2 mt-2">
                  Giảm 300k tiền phòng tháng đầu tiên
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* info detail home  */}
        <div className="mt-2 w-full rounded-[4px] border p-6 gap-6 bg-[#F9FAFB] flex flex-col ">
       {serviceInserts ? serviceInserts.map((i,index)=>(
        <div className="h-[20px] gap-2 w-fit flex" key={index}>
        <h5 className="w-[320px] nthd_text_medium_sm_h20 block">{i?.serviceName}</h5>
        <h5 className="nthd_text_medium_sm_h20">{i.servicePrice} {i.dvt}</h5>
      </div>
       )) :<div>Loading..</div>}
         
          {/* <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">Điện</h5>
            <h5 className="nthd_text_medium_sm_h20">1000 kw/h</h5>
          </div>
         
          <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">Nước</h5>
            <h5 className="nthd_text_medium_sm_h20">1000 đ/người</h5>
          </div>
          
          <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">Xe</h5>
            <h5 className="nthd_text_medium_sm_h20">10000 đ/người</h5>
          </div>
           
          <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">
              Dịch vụ (Wifi riêng từng phòng)
            </h5>
            <h5 className="nthd_text_medium_sm_h20">100000 đ/người</h5>
          </div>
          
          <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">
              Lắp thêm máy giặt
            </h5>
            <h5 className="nthd_text_medium_sm_h20">10</h5>
          </div>
          
          <div className="h-[20px] gap-2 w-fit flex">
            <h5 className="w-[320px] nthd_text_medium_sm_h20 block">
              Số lượng người ở
            </h5>
            <h5 className="nthd_text_medium_sm_h20">10</h5>
          </div> */}

        </div>

        <div className="flex justify-between w-full items-center h-40">
          <div className="text-[28px] font-semibold leading-[28px]   text-red-700">
            4.000.000 VND{" "}
            <span className="font-normal text-gray-500 text-base">/ Khách</span>
          </div>

          {/* button  */}
          <div className="w-fit flex">
            <div onClick={handleShowModal}>
              <Button
                text={" Đặt lịch xem phòng"}
                color={"text-white"}
                background={"bg-red-700"}
              />
            </div>

            <div className="mx-2">
              <Button
                text={"Tổng quan nhà trọ"}
                color={"text-red-700"}
                background={"bg-red-100"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRoom;
