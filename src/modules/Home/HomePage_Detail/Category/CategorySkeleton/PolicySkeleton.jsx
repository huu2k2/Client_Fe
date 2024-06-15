import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { BsBookmarkCheckFill } from 'react-icons/bs';

const PolicySkeleton = () => {
    return (
        <div className="w-full gap-5 nthd_flex_col_between">
            <div className="w-[118px]   ">
                <BsBookmarkCheckFill />
                <span>Chính sách</span>
            </div>
            <Box component="tr" sx={{ height: 40, bgcolor: '#F9FAFB' }}>
                <div className="h-10 flex bg-[#F9FAFB]">
                    <div className="">
                        <p className="nthd_policy_item_th">Thời hạn hợp đồng</p>
                        <Skeleton
                            className='ml-[28px]'
                            variant="text"
                            width={80}
                            height={40}
                        />
                    </div>
                    <div className="">
                        <p className="nthd_policy_item_th">Thời hạn hợp đồng</p>
                        <Skeleton
                            className='ml-[28px]'
                            variant="text"
                            width={80}
                            height={40}
                        />
                    </div>
                    <div className="">
                        <p className="nthd_policy_item_th">Thời hạn hợp đồng</p>
                        <Skeleton
                            className='ml-[28px]'
                            variant="text"
                            width={80}
                            height={40}
                        />
                    </div>
                </div>
            </Box>
            <Box />
        </div>
    )
}



export default PolicySkeleton;
