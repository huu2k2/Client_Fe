import React from 'react'
import { useGetBankQuery } from '../../apis/slice/Bank'
 

const TitleContainer = ({title}) => {
  const {data, isLoading} = useGetBankQuery()
  console.log(data)
  return (
    <div className="w-full flex justify-start">
    <h1 className="text-lg font-medium text-red-800 not-italic">{title}</h1>
</div>
  )
}

export default TitleContainer