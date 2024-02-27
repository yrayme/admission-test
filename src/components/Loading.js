import React, { useState, useEffect } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 14,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#ABCD00' : '#308fe8',
    },
}));

function LinearProgressWithLabel(props) {
  return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
                )}%`}</Typography>
            </Box>
        </Box>
  );
}

export default function Loading() {
  const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
    }, []);

  return (
    <Box sx={{ width: '100%', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", backgroundColor: "rgba(0, 46, 68, 0.15)", zIndex: 9999, }}>
      <Box sx={{width: {xs: "60%", sm: "40%", md:"20%"}, ml: 5}}>
        <Box>
            <Typography variant='h6'>Loading...</Typography>
        </Box>
        <LinearProgressWithLabel value={progress} />
      </Box>
    </Box>
  );
}