import Cart from "./Cart";
import InfoRoom from "./InfoRoom";

const index = () => {
  return (
    <>
      <div className="w-full h-fit rounded-lg p-6 gap-8 nthd_flex_between drop-shadow-xl shadow-lg">
        <Cart />
        <InfoRoom />
      </div>
    </>
  );
};

export default index;
