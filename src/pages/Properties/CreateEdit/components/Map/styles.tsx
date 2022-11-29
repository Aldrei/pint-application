import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const WrapperMap = styled(Box)(() => ({
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: '30',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  '> div.leaflet-container': {
    height: '100%',
    minHeight: '400px'
  },
  '& .leaflet-pane': {
    // flexDirection: 'row'
  }
}));

export const ContainerMapInfo = styled(Box)({
  flexDirection: 'row',
  justifyContent: 'space-between'
});

export const WrapperMapInfo = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '15px 30px',
  '& .MuiSvgIcon-root': {
    marginRight: '5px'
  }
}));

export const WrapperMapLoading = styled(Box)({
  minHeight: '400px'
});
