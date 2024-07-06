import AdditionalCharges from "./AdditionalCharges";
import FurnitureCatalog from "./FurnitureCatalog";
import InfoTitle from "./InfoTitle";
import InformationApartment from "./InformationApartment";
import SalesInformation from "./SalesInformation";

const index = () => {
  return (
    <>
      <div className="w-[1920px] h-[116px] py-10 shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex">
          <div className="text-white text-3xl font-bold leading-9">
            Đặt cọc giữ chỗ
          </div>
        </div>
      </div>

      <div className="w-[1920px] h-[3872px] flex-col justify-start items-center inline-flex">
        <div className="w-[1920px] h-[3872px] relative">
          <div className="w-[1920px] h-32 left-0 top-0 absolute bg-black" />

          <div className="h-[3802px] px-10 py-6 left-[280px] top-0 absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex">
            <div className="self-stretch h-[3754px] flex-col justify-start items-start gap-8 flex">
              <InfoTitle />
           
              <InformationApartment />
              <AdditionalCharges />
              <FurnitureCatalog />
              <SalesInformation />
              <div className="self-stretch h-[59px] flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch h-px flex-col justify-start items-start flex">
                  <div className="self-stretch h-px bg-gray-200" />
                </div>
                <div className="self-stretch justify-end items-center gap-3 inline-flex">
                  <div className="px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex">
                    <button className="cursor-pointer text-white text-sm font-medium leading-tight">
                      Đặt cọc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
