import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

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