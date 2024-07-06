import React from "react";

const InformationApartment = () => {
  return (
    <>
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>

      <div className="self-stretch h-[975px] flex-col justify-start items-start gap-10 flex">
        <div className="self-stretch h-[975px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-[975px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch h-6 flex-col justify-start items-start flex">
              <div className="self-stretch text-rose-800 text-lg font-medium leading-normal">
                Thông tin căn hộ
              </div>
            </div>
            <div className="self-stretch h-[927px] flex-col justify-start items-start gap-4 flex">
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Địa chỉ toà nhà
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
                  <input
                    type="text"
                    className="w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập địa chỉ toà nhà"
                  />
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Mã phòng
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="text"
                    className="w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập mã phòng"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Giá cho thuê
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex w-80">
                  <input
                    type="text"
                    className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập giá cho thuê"
                  />
                  <div className="text-gray-500 text-sm font-normal leading-tight">
                    đ
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="self-stretch h-[146px] flex-col justify-start items-start gap-4 flex">
                <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                  <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                    Thời hạn hợp đồng
                  </div>
                  <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                    <input
                      type="text"
                      className="w-full text-sm font-normal leading-tight outline-none"
                      placeholder="Nhập thời hạn hợp đồng"
                    />
                    
                  </div>
                </div>
                <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                  <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                    Đặt cọc
                  </div>
                  <div className="self-stretch px-[13px] py-[9px] bg-neutral-100 rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
                    <input
                      type="text"
                      className="w-full text-sm font-normal leading-tight outline-none bg-neutral-100"
                      placeholder="Nhập số tiền đặt cọc"
                    />
                  </div>
                </div>
                <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                  <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                    Hoa hồng
                  </div>
                  <div className="self-stretch px-[13px] py-[9px] bg-neutral-100 rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
                    <input
                      type="text"
                      className="w-full text-sm font-normal leading-tight outline-none bg-neutral-100"
                      placeholder="Nhập hoa hồng"
                    />
                    <div className="text-gray-500 text-sm font-normal leading-tight">
                      %
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Ngày đặt cọc
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="date"
                    className="w-full text-sm font-normal text-gray-500 leading-tight outline-none"
                    placeholder="dd/mm/yyyy"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Số tiền cọc giữ phòng
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex w-80">
                  <input
                    type="text"
                    className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập số tiền cọc giữ phòng"
                  />
                  <div className="text-gray-500 text-sm font-normal leading-tight">
                    đ
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Số tiền cọc bổ sung
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex w-80">
                  <input
                    type="text"
                    className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập số tiền cọc bổ sung"
                  />
                  <div className="text-gray-500 text-sm font-normal leading-tight">
                    đ
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Hạn thanh toán tiền cọc
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="date"
                    className="w-full text-sm font-normal text-gray-500 leading-tight outline-none"
                    placeholder="dd/mm/yyyy"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Ngày bắt đầu thuê
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="date"
                    className="w-full text-sm font-normal text-gray-500 leading-tight outline-none"
                    placeholder="dd/mm/yyyy"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Số lượng người ở
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="text"
                    className="w-full text-sm font-normal text-gray-900 leading-tight outline-none"
                    placeholder="Nhập số lượng người ở"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Số lượng xe
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
                  <input
                    type="text"
                    className="w-full text-sm font-normal text-gray-900 leading-tight outline-none"
                    placeholder="Nhập số lượng xe"
                  />
                  
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Chương trình ưu đãi
                </div>
                <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
                  <input
                    type="text"
                    className="w-full text-sm font-normal leading-tight outline-none"
                    placeholder="Nhập chương trình ưu đãi"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationApartment;
