import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { BsWifi } from 'react-icons/bs';

const UtilityDirectorySkeleton = () => {
    return (
        <Box
            sx={{
                width: 312,
                height: 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                mt: 5,
            }}
        >
            <div className="w-[165px] h-6 gap-2 flex justify-between nthd_text_medium_base items-center">
                <BsWifi />
                <span>Danh mục tiện ích</span>
            </div>
            <Box
                sx={{
                    width: 'fit-content',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
            </Box>
        </Box>
    );
};

export default UtilityDirectorySkeleton;
