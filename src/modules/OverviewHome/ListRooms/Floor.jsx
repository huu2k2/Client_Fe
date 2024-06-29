import React from 'react'
import Cart from './Cart'

const Floor = () => {
  return (
    <div className="flex-col w-full justify-start items-start gap-8 flex">
    <div className="self-stretch h-[488px] flex-col justify-start items-start gap-6 flex">

      <div className="self-stretch h-6 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-gray-900 text-lg font-medium leading-normal">
          Tầng 1
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 ">
          {/* start card */}
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
       <Cart/>
        {/* end cart */}
      </div>
      
    </div>

    <div className="self-stretch h-px flex-col justify-start items-start flex">
      <div className="self-stretch h-px bg-gray-200" />
    </div>
  </div>
  )
}

export default Floor