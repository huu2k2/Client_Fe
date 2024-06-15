import {Suspense } from 'react';
import CustomLoading from '../CustomLoading';
 

// Suspense wrapper component để giảm lặp lại mã
const LazyWrapper = ({ children }) => (
  
  <Suspense fallback={<CustomLoading/>}>
    {children}
  </Suspense>
);
 
export default LazyWrapper;
