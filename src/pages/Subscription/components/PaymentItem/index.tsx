import { ChipOwnProps } from '@mui/material/Chip';
import Card from '../../../../components/Card';
import { IPayment } from '../../../../reducers/subscription';
import { PaymentItemPrice, PaymentItemReferenceDate, PaymentItemReferenceDateContainer, PaymentItemStatus, PaymentItemStatusContainer } from './styles';
import Divider from '@mui/material/Divider';

type PaymentItemProps = {
  payment: IPayment;
}

const getFriendlyDate = (payment: IPayment) => {
  if (!payment.reference_date) return null;
  const date = new Date(payment.reference_date);
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
};

type GetStatusType = 'Aberto' | 'Fechado';

const getStatus = (payment: IPayment): GetStatusType => {
  if (!payment.paid_at || !payment.stripe_code_payment) return 'Aberto';
  return 'Fechado';
};

const getStatusColor = (status: GetStatusType): ChipOwnProps['color'] => {
  if (status === 'Aberto') return 'warning';
  return 'success';
};

export const PaymentItem = ({ payment }: PaymentItemProps) => {
  if (!payment) return null;

  const paymentStatus = getStatus(payment);

  return <Card data-testid='payment-container'>
    <PaymentItemStatusContainer>
      <PaymentItemStatus label={paymentStatus} color={getStatusColor(paymentStatus)} />
    </PaymentItemStatusContainer>
    <Divider style={{ margin: '15px 0' }} />
    <PaymentItemReferenceDateContainer>
      <PaymentItemReferenceDate>
        {getFriendlyDate(payment)}
      </PaymentItemReferenceDate>
      <PaymentItemPrice variant='h4'>R$99</PaymentItemPrice>
    </PaymentItemReferenceDateContainer>
  </Card>;
};
