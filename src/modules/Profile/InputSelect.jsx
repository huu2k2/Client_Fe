import React from 'react';
import Select from 'react-select';
import { useGetBankQuery } from '@apis/slice/Bank';
import { useFormContext } from 'react-hook-form';

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

const InputSelect = ({ label,nameRegister  }) => {
  const { data, isLoading } = useGetBankQuery();
  const { register,setValue  } = useFormContext();
 

  // Xử lý khi dữ liệu đã có sẵn
  const options =data?.data && data.data.map((i) => ({
    value: i.id,
    label: i.name
  })) || [];

  // Tìm option có value tương ứng với label truyền vào
  const selectedOption = options.filter((option) => option?.value === Number(label));

  // Handle onChange event
  const handleSelectChange = (selectedOption) => {
    setValue(nameRegister, selectedOption?.value); // Set the selected value to the form state
 
  };
  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-gray-700">Ngân hàng</span>
      <Select
      name={'bank'}
        styles={customStyles}
        className='w-[312px]'
        {...register(nameRegister)}
        value={selectedOption} // Sử dụng selectedOption thay vì valueCurent.label
        options={options}
        onChange={handleSelectChange}
        placeholder="Chọn ngân hàng"
      />
    </div>
  );
};

export default InputSelect;
