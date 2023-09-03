import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
    <Box
      sx={{
        height: { xs: 'auto', md: '92vh' },
        borderRight: '2px solid #3d3d3d',
        px: { xs: 0, md: 2 },
        color: '#000',
      }}
    >
      <Sidebar />
    </Box>

      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Typography variant="h4">Admin Dashboard</Typography>

      </Box>
</Stack>  );
};

export default Dashboard;
