import React from 'react';
import { useLocation } from 'react-router-dom';
import GridCart from '../GridCart';
import SimilarRoom from '../GridCart/SimilarRoom';

const Index = () => {
  const location = useLocation();

  // Kiểm tra pathname của location để quyết định khi nào hiển thị GridCart
  const showGridCart = location.pathname === '/';

  return (
    <div className='w-[1360px] '>
      {showGridCart && <GridCart id={0}/>}
      {!showGridCart && <SimilarRoom />}
    </div>
  );
};

export default Index;
