
import GridCart from '@components/GridCart'

const index = ({ title, data }) => {
  return (
    <div className="w-full h-[381px] nthd_flex_col_between ">
      <div className="w-full h-8 flex justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <span className="">Xem thêm</span>
      </div>

      <GridCart n={4} />

    </div>
  );
};

export default index;
