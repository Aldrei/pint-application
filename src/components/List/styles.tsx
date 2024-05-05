import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const Container = styled(Box)();

export const InfosContainer = styled(Box)`
  .MuiListItemText-root:nth-child(2) {
    padding-left: 15px;
    border-left: 5px solid rgba(255, 255, 255, 0.12);

    span.MuiListItemText-primary {
      font-size: 13px;
    }

    p.MuiListItemText-secondary {
      font-size: 12px;
    }
  }
`;

export const Title = styled('h2')`
  margin: 8px;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(144, 202, 249, 0.5);
`;