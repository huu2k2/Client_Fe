import Cart from "./Cart";
import InfoRoom from "./InfoRoom";

const index = () => {
  return (
    <>
      <div className="w-full h-fit rounded-lg p-6 gap-8 flex-col sm:flex-row lg:flex-row nthd_flex_between drop-shadow-xl shadow-lg flex-wrap">
        <Cart />
        <InfoRoom />
      </div>
    </>
  );
};

export default index;
