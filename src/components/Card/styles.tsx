import { styled } from '@mui/material/styles';


export const CardStyle = styled('div')(({ theme }) => ({
  padding: '40px',
  width: 'fit-content',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(23, 58, 94)',
  /* border: 1px solid blue; */
}));
