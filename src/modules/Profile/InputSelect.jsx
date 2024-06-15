import React from 'react';
import Select from "react-select";

const bankOptions = [
  { value: 'VCB', label: 'Vietcombank' },
  { value: 'TCB', label: 'Techcombank' },
  { value: 'BIDV', label: 'BIDV' },
  { value: 'VIB', label: 'VIB' },
  { value: 'ACB', label: 'ACB' },
  { value: 'VPB', label: 'VPBank' },
  { value: 'MBB', label: 'MBBank' },
  { value: 'SHB', label: 'SHB' },
  { value: 'OCB', label: 'OCB' },
  { value: 'SCB', label: 'SCB' },
  { value: 'HSBC', label: 'HSBC' },
  { value: 'CITI', label: 'Citibank' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    
    borderColor: '#D1D5DB', // Màu viền xám (gray-300)
    borderRadius: '6px', // Bo góc 6px
    padding: '2px', // Khoảng cách bên trong
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', // Shadow/sm
    '&:hover': {
      borderColor: '#D1D5DB', // Giữ nguyên màu viền khi hover
    }
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '6px',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', // Shadow/sm
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6B7280', // Màu xám (gray-700)
  })
};

const InputSelect = () => {
  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-gray-700">Ngân hàng</span>
      <Select styles={customStyles} className='w-[312px]'  options={bankOptions} placeholder="Chọn ngân hàng"/>
    </div>
  );
}

export default InputSelect;
