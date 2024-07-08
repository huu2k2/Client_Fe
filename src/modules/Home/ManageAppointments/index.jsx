import React from 'react'
import Header from './Header'
import Tiltle from './Tiltle'
import BodyTable from './BodyTable'
 

const index = () => {
  return (
    <div className='gap-4 flex flex-col items-start'>
    <Header/>
    <Tiltle/>
    <BodyTable/>
    </div>
  )
}

export default index