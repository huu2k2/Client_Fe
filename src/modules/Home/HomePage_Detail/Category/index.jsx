import React from 'react'
import UtilityDirectory from './UtilityDirectory'
import BasicInterior from './BasicInterior'
import Policy from './Policy'
import PolicySkeleton from '../../../HomeManagement'
import UtilityDirectorySkeleton from './CategorySkeleton/UtilityDirectorySkeleton';
import BasicInteriorSkeleton from './CategorySkeleton/BasicInteriorSkeleton'


const index = () => {

  return (
    <div className='w-full h-[615px]  gap-12 flex flex-col mt-6'>
      <UtilityDirectory />
      {/* <UtilityDirectorySkeleton /> */}
      <BasicInterior />
      {/* <BasicInteriorSkeleton /> */}
      <Policy />
      {/* <PolicySkeleton /> */}
    </div>
  )
}



export default index