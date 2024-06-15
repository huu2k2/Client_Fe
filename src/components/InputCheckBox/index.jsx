import React from 'react'

const index = ({ value, label, checked, onChange }) => {
  return (
    <div className="flex justify-start items-center gap-2">
    {/* <input type="checkbox" name={value} value={value} className='text-red-700' /> 
    <label htmlFor={value} className="text-sm font-medium ">
      {label}
    </label> */}
     <label className="flex items-center gap-2">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox"
      />
      {label}
    </label>
  </div>
  )
}

export default index