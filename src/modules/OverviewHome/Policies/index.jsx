import BasicInterior from "./BasicInterior";
import BuildingPolicy from "./BuildingPolicy";
import ContactManagement from "./ContactManagement";
import Deposit from "./Deposit";
import Policy from "./Policy";
import Tips from "./Tips";
import UtilityDirectory from "./UtilityDirectory";

const index = () => {
  return (
    <>
      <div className="w-full h-[116px] py-10 shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex"></div>
      </div>

      <div className="w-full h-[2027px] flex-col justify-start items-center inline-flex">
        <div className="w-full h-[2027px] relative">
          <div className="w-full h-32 left-0 top-0 absolute bg-black" />
          <div className="h-fit p-6 left-[280px] top-[-100.50px] absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex">
            <Policy />

            <UtilityDirectory />

            <BasicInterior />

            <BuildingPolicy />

            <Deposit />

            <Tips />

            <ContactManagement />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
