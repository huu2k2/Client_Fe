import React from 'react'

const TitleContainer = ({title}) => {
  return (
    <div className="w-full flex justify-start">
    <h1 className="text-lg font-medium text-rose-800 not-italic">{title}</h1>
</div>
  )
}

export default TitleContainer