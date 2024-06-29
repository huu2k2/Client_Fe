const UtilityDirectory = () => {
  return (
    <div className="self-stretch h-[247px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium  leading-normal">
          Danh mục tiện ích
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch h-[182px] flex-col justify-center items-center flex">
        <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
          <div className="w-5 h-5 relative" />
          <div className="grow shrink basis-0 text-gray-500 text-sm font-medium  leading-tight">
            Thang máy
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
          <div className="w-5 h-5 relative" />
          <div className="grow shrink basis-0 text-gray-500 text-sm font-medium  leading-tight">
            Cổng vân tay
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
          <div className="w-5 h-5 relative" />
          <div className="grow shrink basis-0 text-gray-500 text-sm font-medium  leading-tight">
            Camera 24/7
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityDirectory;
