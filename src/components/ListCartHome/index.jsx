import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GridCart from '../GridCart';
import SimilarRoom from '../GridCart/SimilarRoom';

const Index = () => {
  const location = useLocation();
  const { idroom } = useParams();
  // Kiểm tra pathname của location để quyết định khi nào hiển thị GridCart
  const showGridCart = location.pathname === '/';

  return (
    <div className='w-[1360px] '>
      {showGridCart && <GridCart id={0}/>}
      {!showGridCart && <SimilarRoom id={idroom}/>}
    </div>
  );
};

export default Index;
