import React, { useState } from 'react'
import Header from './Header'
import Tiltle from './Tiltle'
import BodyTable from './BodyTable'
import SideBar from './SideBar'

const index = () => {
  const [isShow,setIsShow] = useState(false)
 const [getInfo, setInfo]= useState({roomId:0,houseAddress:'',rentalPrice:0,roomCode:'100'})
 
  return (
    <div className='gap-4 flex flex-col items-start'>
     
    <Header/>
    <Tiltle/>
    <BodyTable setIsShow={setIsShow} isShow={isShow}  setInfo={setInfo}/>
    <SideBar  getInfo={getInfo}/>
    </div>
  )
}

export default index