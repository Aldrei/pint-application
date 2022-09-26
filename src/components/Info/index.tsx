import * as React from 'react';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LocationOn from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { WrapperInfo, BoxInfo, WrapperStack, WrapperTitle, Title, Text } from './styles';

const Info = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <Avatar variant="rounded" src="avatar1.jpg" sx={{ borderRadius: '10px' }} />
          <WrapperTitle
            spacing={0.5}
          >
            <Title>
              Michael Scott
            </Title>
            <Text style={{ display: 'flex', alignItems: 'center', marginTop: '0' }}>
              <LocationOn sx={{ marginLeft: '-5px' }} /> Scranton, PA
            </Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Text>Você que ama ver seus filhos e seus pets brincando sem preocupações, essa é a casa perfeita ! Esta belíssima casa conta a história dessa família que pensou em cada detalhe durante a sua construção.</Text>
          <Chip label="Active account" sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
          }} />
        </WrapperStack>
      </WrapperInfo>
      
      <Divider sx={{ margin: '25px 0' }} />

      <WrapperInfo>
        <BoxInfo>
          <Stack>
            <Title>
              Michael Scott
            </Title>
          </Stack>
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Text>Você que ama ver seus filhos e seus pets brincando sem preocupações, essa é a casa perfeita ! Esta belíssima casa conta a história dessa família que pensou em cada detalhe durante a sua construção.</Text>
        </WrapperStack>
      </WrapperInfo>

      <Divider sx={{ margin: '25px 0' }} />

      <WrapperInfo>
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title>
              <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
            </Title>
            <Text>
              Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.
            </Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfo>

      <Divider sx={{ margin: '25px 0' }} />

      <Box 
        sx={{
          flexDirection: 'row'
        }}
      >
        <WrapperInfo>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Title>
              <Text>Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.</Text>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo style={{ margin: '0 5px' }}>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Title>
              <Text>Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.</Text>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>
                <LocationOn fontSize='small' sx={{ margin: '0 5px 0 -5px' }} /> Scranton, PA
              </Title>
              <Text>Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.</Text>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
      </Box>
    </React.Fragment>
  );
};

export default Info;