import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
const index = () => {
  return (
    <div className='w-full h-fit bg-black'>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default index