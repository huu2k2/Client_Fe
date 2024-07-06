import React from 'react'
import InfoAccount from './InfoAccount'

const InfoTitle = () => {
  return (
    <div className="self-stretch h-[580px] flex-col justify-start items-start gap-10 flex">
    <div className="self-stretch h-[580px] flex-col justify-start items-start gap-5 flex">
      <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-gray-900 text-lg font-bold leading-normal ">
          Nhà trọ 123 Lê Hoàng Phái
        </div>
        <div className="self-stretch text-gray-500 text-sm font-normal leading-tight">
          123 Lê Hoàng Phái, Phường 12, Gò Vấp, Tp. Hồ Chí Minh
        </div>
      </div>

     <InfoAccount/>
      
    </div>
  </div>
  )
}

export default InfoTitle