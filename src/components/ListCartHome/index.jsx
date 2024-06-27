import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GridCart from '../GridCart';
import SimilarRoom from '../GridCart/SimilarRoom';

const Index = () => {
  const location = useLocation();
  const { idroom } = useParams();
  // Kiểm tra pathname của location để quyết định khi nào hiển thị GridCart
  const showGridCart = location.pathname === '/';
  const showRoomLike = location.pathname === '/danh_sach_phong_yeu_thich';
  return (
    <div className='w-[1360px] flex flex-col gap-5 mb-20'>
     {showRoomLike && <h1 className="font-semibold text-2xl">Danh sách phòng yêu thích</h1>}
      {showGridCart && <GridCart id={0}/>}
      {!showGridCart && <SimilarRoom id={idroom} money ={null} address={null}/>}
    </div>
  );
};

export default Index;
