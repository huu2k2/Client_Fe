 

const TextArea = ({label}) => {
  return (
  <>
  <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
      <div className="w-[755px] h-[105px] gap-6 flex   self-stretch justify-start">
        <span className="text-gray-700 w-[411px] text-sm font-medium  leading-5">
         {label}
        </span>
        <textarea
        placeholder="Enter your text here..."
        rows={5} // Độ cao của textarea (số hàng)
        cols={50} // Độ rộng của textarea (số ký tự trên mỗi hàng)
        className="flex w-80 h-28 px-2 py-91 pl-306 pt-2 justify-end items-center flex-shrink-0 rounded-lg border border-gray-300 bg-white shadow-sm"
      />
      </div>
  </>
  )
}

export default TextArea