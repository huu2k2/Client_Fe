const ContactManagement = ({ data }) => {
  return (
    <div className=" w-full self-stretch h-[186px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium  leading-normal">
          Liên hệ quản lý
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="w-full self-stretch h-[60px] flex-col justify-center items-center flex">
        <div className="w-full self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full lg:w-[1264px] h-5 justify-between items-center gap-[17px] inline-flex">
            <div className="w-fit lg:w-[410px] text-gray-500 text-sm font-medium  leading-tight">
              Tên quản lý
            </div>

            {data?.managers?.map((i, index) => (
              <div
                className="w-fit lg:w-[838px] text-gray-900 text-sm font-normal  leading-tight"
                key={index}
              >
                {i.managerName}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className=" w-full self-stretch h-[60px] flex-col justify-center items-center flex">
        <div className="w-full self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full lg:w-[1264px] h-5 justify-between items-center gap-4 inline-flex">
            <div className="w-fit lg:w-[410px] text-gray-500 text-sm font-medium  leading-tight">
              Số điện thoại
            </div>

            {data?.managers?.map((i, index) => (
              <div
                className="w-fit lg:w-[838px] text-gray-900 text-sm font-normal  leading-tight"
                key={index}
              >
                {i.phoneNumber}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
