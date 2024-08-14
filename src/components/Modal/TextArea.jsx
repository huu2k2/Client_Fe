

const TextArea = ({ label, name, value, onChange, width }) => {
  return (
    <>
      <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
      <div className="w-full md:w-[755px] h-fit md:h-[105px] gap-6 flex flex-col lg:flex-row  items-center self-stretch justify-start">
        <span className="text-gray-700 w-[411px] text-sm font-medium  leading-5">
          {label}
        </span>
        <textarea
          className={`px-4 py-2 border rounded-md ${width}  outline-none`}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default TextArea