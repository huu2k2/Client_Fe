const Policy = ({data}) => {
  return (
    <div className="self-stretch w-full h-fit bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div
          className="self-stretch text-rose-800 text-lg font-medium 
         leading-normal"
        >
          Chính sách
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch w-full h-fit flex-col justify-center items-center flex">
        {data && data?.services?.map((i,index)=>(
          <div key={index} className="w-full">
          <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full lg:w-[1264px] h-5 justify-between items-center gap-4 inline-flex">
            <div
              className="w-fit lg:w-[410px] text-gray-500 text-sm font-medium 
             leading-tight"
            >
              {i.serviceName}
            </div>
            <div
              className="w-fit lg:w-[838px] text-gray-900 text-sm font-normal 
             leading-tight"
            >
              {i.servicePrice.toLocaleString()} / {i.dvt}
            </div>
          </div>
          
        </div>
         <div className={`self-stretch h-px bg-gray-200 ${data?.services?.length ===index+1 ?'hidden':''}`} />
         </div>
        ))}
        

       

       
        
      </div>
    </div>
  );
};

export default Policy;
