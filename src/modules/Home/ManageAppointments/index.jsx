import React, { useState } from 'react'
import Header from './Header'
import Tiltle from './Tiltle'
import BodyTable from './BodyTable'

const index = () => {
  const [isShow,setIsShow] = useState(false)

  return (
    <div className='gap-4 flex flex-col items-start'>
     
    <Header/>
    <Tiltle/>
    <BodyTable setIsShow={setIsShow} isShow={isShow}  />
    </div>
  )
}

export default index