
import { useParams } from "react-router-dom";
import BasicInterior from "./BasicInterior";
import BuildingPolicy from "./BuildingPolicy";
import ContactManagement from "./ContactManagement";
import Deposit from "./Deposit";
import Policy from "./Policy";
import Tips from "./Tips";
import UtilityDirectory from "./UtilityDirectory";
import { useGetPolicyOfHomeQuery,useGetFullInformationOFHomeQuery } from "@apis/slice/Houses";

const index = () => {
  const { idHome } = useParams();
  const {data:Data} = useGetFullInformationOFHomeQuery(idHome)
  const {data}= useGetPolicyOfHomeQuery(idHome)
 
  return (
    <>
      <div className="w-full h-fit shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex"></div>
      </div>

      <div className="w-full h-fit flex-col justify-start items-center flex bg-black">
        <div className="w-full h-fit relative">
          <div className="w-full h-32 left-0 top-0 absolute bg-black" />
          <div className=" w-full lg:w-[1360px] h-fit p-6 inset-0  absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex left-1/2 transform -translate-x-1/2">
            <Policy data={data?.response}/>

            <UtilityDirectory data={data?.response}/>

            <BasicInterior data={data?.response}/>

            <BuildingPolicy data={data?.response}/>

            <Deposit data={data?.response}/>

            {/* <Tips /> */}

            <ContactManagement data={data?.response}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
