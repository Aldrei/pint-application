import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export const WrapperMap = styled(Box)({
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
  },
});

export const ContainerMapInfo = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 6px',
  '& .MuiButton-root .MuiSvgIcon-root': {
    marginRight: '5px',
  },
  '& .MuiFormControlLabel-root': {
    padding: '15px 30px'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& .MuiFormControlLabel-root': {
      padding: '0'
    },
  }
}));

export const ContainerMapInfoColLeft = styled(Box)({
  flexDirection: 'row'
});

export const WrapperMapInfo = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '15px 20px 15px 3px',
  // fontSize: '13px',
  '& .MuiSvgIcon-root': {
    marginRight: '5px'
  }
}));

export const WrapperMapLoading = styled(Box)({
  minHeight: '400px'
});

export const MapLoading = styled(Skeleton<'div'>)({
  transform: 'unset', 
  width: '100%', 
  height: '100%', 
  borderRadius: '0'
});

export const WrapperTip = styled(Box)({
  marginBottom: '32px'
});

export const TipText = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));
