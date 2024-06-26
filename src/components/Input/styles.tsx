import { styled } from '@mui/material/styles';

import TextareaAutosize from '@mui/material/TextareaAutosize';

export const InputStyle = styled('input')(() => ({
  marginBottom: '10px',
  height: '40px',
  minHeight: '40px',
  padding: '0 20px',
  background: 'none',
  border: '1px solid rgba(255, 255, 255, 0.23)',
  borderRadius: '4px',
  color: 'rgb(178, 186, 194)',
  '&:last-child': {
    marginBottom: '0'
  }
}));

export const MultilineInputStyle = styled(TextareaAutosize)(() => ({
  marginBottom: '10px',
  height: '40px',
  minHeight: '40px',
  padding: '10px 20px',
  background: 'none',
  border: '1px solid rgba(255, 255, 255, 0.23)',
  borderRadius: '4px',
  color: 'rgb(178, 186, 194)',
  '&:last-child': {
    marginBottom: '0'
  }
}));
