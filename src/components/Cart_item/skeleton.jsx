import React from 'react';
import { Box, Skeleton } from '@mui/material';

const Index = () => {
  return (
    <Box
      sx={{
        width: 328,
        height: 325,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: 1,
        borderColor: 'blue.300',
        boxShadow: 1,
        borderRadius: 2,
        padding: 2,
        maxWidth: 'sm',
        mx: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={185} sx={{ borderRadius: 1 }} />
      </Box>
      <Box
        sx={{
          height: 'fit-content',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 1,
        }}
      >
        <Skeleton variant="rounded" width={53} height={20} sx={{ py: 0.5, px: 1 }} />
        <Skeleton variant="rounded" width="100%" height={20} />
        <Skeleton variant="rounded" width="100%" height={20} />
        <Skeleton variant="rounded" width="100%" height={20} />
      </Box>
    </Box>
  );
};

export default Index;
