import * as React from 'react';

// import Card from '../Card';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LocationOn from '@mui/icons-material/LocationOn';
// import Edit from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
// import Switch from '@mui/material/Switch';
// import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';


const Info = () => {
  const theme = useTheme();

  return (
    <React.Fragment>      
      <Card style={{
        backgroundColor: theme.palette.background.default,
        border: '1px solid rgb(30, 73, 118)',
        borderRadius: '10px'
      }} >
        <Box sx={{
          p: 2, 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }} >
          {/* <Avatar variant="rounded" src="avatar1.jpg" sx={{ borderRadius: '10px' }} /> */}
          <Stack>
            <Typography fontWeight={400} sx={{
              color: theme.palette.text.primary
            }} >
              Michael Scott
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 4, py: 2, backgroundColor: theme.palette.background.paper }}
        >
          <Typography fontWeight={100} sx={{ color: theme.palette.text.secondary }}>Você que ama ver seus filhos e seus pets brincando sem preocupações, essa é a casa perfeita ! Esta belíssima casa conta a história dessa família que pensou em cada detalhe durante a sua construção.</Typography>
        </Stack>
      </Card>
      
      <Divider sx={{ margin: '25px 0' }} />

      <Card style={{
        backgroundColor: theme.palette.background.default,
        border: '1px solid rgb(30, 73, 118)',
        borderRadius: '10px',
      }} >
        <Box sx={{
          p: 2, 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }} >
          <Avatar variant="rounded" src="avatar1.jpg" sx={{ borderRadius: '10px' }} />
          <Stack spacing={0.5} sx={{
            margin: '0 20px',
          }} >
            <Typography fontWeight={700} sx={{
              color: 'rgb(231, 235, 240)'
            }} >
              Michael Scott
            </Typography>
            <Typography variant="body2" color="text.secondary" 
              sx={{ 
                display: 'flex', 
                color: 'rgb(178, 186, 194)', 
                alignItems: 'center'
              }} 
            >
              <LocationOn sx={{ marginLeft: '-5px' }} /> Scranton, PA
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, backgroundColor: 'background.paper' }}
        >
          <Typography fontWeight={100} sx={{ color: 'rgb(102, 178, 255)' }}>Você que ama ver seus filhos e seus pets brincando sem preocupações, essa é a casa perfeita ! Esta belíssima casa conta a história dessa família que pensou em cada detalhe durante a sua construção.</Typography>
          <Chip label="Active account" sx={{
            border: '1px solid rgb(0, 127, 255)',
            backgroundColor: 'rgb(0, 89, 178)',
            color: 'white'
          }} />
        </Stack>
      </Card>

      <Divider sx={{ margin: '25px 0' }} />

      <Card style={{
        backgroundColor: theme.palette.background.default,
        border: '1px solid rgb(30, 73, 118)',
        borderRadius: '10px',
        marginBottom: '50px'
      }} >
        <Box sx={{
          p: 2, 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }} >
          <Stack spacing={0.5} sx={{
            margin: '0 20px',
          }} >
            <Typography 
              fontWeight={500}
              sx={{ 
                display: 'flex', 
                color: 'rgb(255, 255, 255)', 
                alignItems: 'center',
                fontSize: '16px'
              }} 
            >
              <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
            </Typography>
            <Typography variant="body2" color="text.secondary" 
              sx={{ 
                display: 'flex', 
                color: 'rgb(178, 186, 194)', 
                alignItems: 'center'
              }} 
            >
              Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.
            </Typography>
          </Stack>
        </Box>
      </Card>

      <Box 
        sx={{
          flexDirection: 'row'
        }}
      >
        <Card style={{
          backgroundColor: theme.palette.background.default,
          border: '1px solid rgb(30, 73, 118)',
          borderRadius: '10px',
          marginBottom: '50px'
        }} >
          <Box sx={{
            p: 2, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }} >
              <Typography 
                fontWeight={500}
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(255, 255, 255)', 
                  alignItems: 'center',
                  fontSize: '16px'
                }} 
              >
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Typography>
              <Typography variant="body2" color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(178, 186, 194)', 
                  alignItems: 'center'
                }} 
              >
              Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.
              </Typography>
            </Stack>
          </Box>
        </Card>
        <Card style={{
          backgroundColor: theme.palette.background.default,
          border: '1px solid rgb(30, 73, 118)',
          borderRadius: '10px',
          marginBottom: '50px',
          marginLeft: '5px',
          marginRight: '5px',
        }} >
          <Box sx={{
            p: 2, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }} >
              <Typography 
                fontWeight={500}
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(255, 255, 255)', 
                  alignItems: 'center',
                  fontSize: '16px'
                }} 
              >
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Typography>
              <Typography variant="body2" color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(178, 186, 194)', 
                  alignItems: 'center'
                }} 
              >
              Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.
              </Typography>
            </Stack>
          </Box>
        </Card>
        <Card style={{
          backgroundColor: theme.palette.background.default,
          border: '1px solid rgb(30, 73, 118)',
          borderRadius: '10px',
          marginBottom: '50px'
        }} >
          <Box sx={{
            p: 2, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }} >
              <Typography 
                fontWeight={500}
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(255, 255, 255)', 
                  alignItems: 'center',
                  fontSize: '16px'
                }} 
              >
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Typography>
              <Typography variant="body2" color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  color: 'rgb(178, 186, 194)', 
                  alignItems: 'center'
                }} 
              >
              Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.
              </Typography>
            </Stack>
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default Info;