import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

export const PaymentItemReferenceDateContainer = styled('div')(() => ({}));

export const PaymentItemReferenceDate = styled('span')(() => ({
  textTransform: 'uppercase',
}));

export const PaymentItemStatusContainer = styled('div')(() => ({
  flexDirection: 'row',
}));

export const PaymentItemStatus = styled(Chip)(() => ({
  textTransform: 'uppercase',
}));

export const PaymentItemPriceContainer = styled('div')(() => ({}));

export const PaymentItemPrice = styled(Typography)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));