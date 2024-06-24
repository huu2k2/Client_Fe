
import GridCart from '@components/GridCart'
import { Link } from 'react-router-dom';

const index = ({ title, data ,money,address}) => {

  return (
    <div className="w-full h-[381px] nthd_flex_col_between ">
      <div className="w-full h-8 flex justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <Link to={`/similarRooms/${data}`} className=" text-sm font-medium text-red-500">Xem thêm</Link>
      </div>

      <GridCart id={data}/>

    </div>
  );
};

export default index;
