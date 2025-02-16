import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { availablePaymentsServiceThunk, IPayment, ISubscriptionState } from '../../reducers/subscription';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ButtonContainer, StripeContainer, MessageContainer, AvailablePaymentsContainer } from './styles';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { paymentIntentServiceThunk, paymentConfirmServiceThunk } from '../../reducers/subscription';
import { PaymentItem } from './components/PaymentItem';

const SubscriptionPage = (): React.ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const [openPayments, setOpenPayments] = useState<IPayment[]>([]);
  const [pendingPayments, setPendingPayments] = useState<IPayment[]>([]);

  // STEP 2(paymentIntentResponse) -> 4(payment).
  const { 
    availablePaymentsService,
    paymentIntentService,
    paymentConfirmService,
  } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  const { data: availablePaymentsFromService } = availablePaymentsService;
  const { data: paymentIntent } = paymentIntentService;
  const { data: payment } = paymentConfirmService;

  const availablePaymentId = availablePaymentsFromService?.[0]?.id || 0;
  const shouldRenderStripe = !!(paymentIntent?.clientSecret && paymentIntent?.paymentIntentId);
  
  const isLoading = availablePaymentsService.status === 'idle' || 
    paymentIntentService.status === 'idle';

  useEffect(() => {
    if (availablePaymentId) {
      const result = availablePaymentsFromService[0] as IPayment;

      /**
        * NOTE: The payment is considered open there's no stripe_code_payment and paid_at date associate yet.
        */
      if (!result.paid_at || !result.stripe_code_payment) {
        setOpenPayments([result]);
        setPendingPayments([]);
      }

      /**
        * NOTE: The payment is considered pending if it has not been paid yet but has stripe_code_payment.
        */
      if (!result.paid_at && result.stripe_code_payment) {
        setPendingPayments([result]);
        setOpenPayments([]);
      }
    } else {
      setPendingPayments([]);
      setOpenPayments([]);
    }
  }, [availablePaymentsFromService]);

  // Available Payments
  const handleAvailablePayments = async () => await dispatch(availablePaymentsServiceThunk());

  // Intent payment
  const handleIntentPayment = async () => await dispatch(paymentIntentServiceThunk({}));

  // Confirm payment
  const handleConfirmPayment = async () => {
    const cardElement = elements?.getElement(CardElement);

    console.log('[SUBS. UI] handleSubmit availablePaymentId:', availablePaymentId);

    // STEP 3.
    if (availablePaymentId)
      dispatch(paymentConfirmServiceThunk({ 
        paymentAvailableId: availablePaymentId,
        stripe, 
        cardElement, 
        clientSecret: paymentIntent?.clientSecret, 
        paymentIntentId: paymentIntent?.paymentIntentId,
        billingDetails: {
          name: 'Name Test' // TODO: Get from user data: Name(domain).
        }, 
      }));
  };

  useEffect(() => {
    // STEP 0.
    handleAvailablePayments();
  }, []);

  useEffect(() => {
    // STEP 1.
    if (availablePaymentId) handleIntentPayment();
  }, [availablePaymentId]);

  useEffect(() => {
    // STEP 2.
    if (payment) handleAvailablePayments();
  }, [payment]);

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  if (isLoading) return <div/>;

  return (
    <StripeContainer data-testid='stripe-container'>
      {!!openPayments.length && <AvailablePaymentsContainer>
        <PaymentItem payment={openPayments[0]} />
      </AvailablePaymentsContainer>}

      {!!pendingPayments.length && <AvailablePaymentsContainer>
        <PaymentItem payment={pendingPayments[0]} />
      </AvailablePaymentsContainer>}

      {!shouldRenderStripe && !openPayments.length && <MessageContainer>
        <Alert type="info" title='Tudo pago' text="Sem pagamentos em aberto." />
      </MessageContainer>}

      {shouldRenderStripe && !!openPayments.length && <Card>
        <CardElement options={{
          style: {
            base: {
              color: '#fff'
            },
          }
        }} />
        <ButtonContainer>
          <Button onClick={handleConfirmPayment} data-testid="button-login" color='blue' loading={(paymentIntent.status === 'loading')} text='Pagar' />
        </ButtonContainer>
        {payment.status === 'success' && payment.paymentIntent && (
          <MessageContainer>
            <Alert type="success" title="Sucesso!" text="Pagamento executado com sucesso" />
          </MessageContainer>
        )}
        {payment.status === 'failed' && payment.error && (
          <MessageContainer>
            <Alert type="error" title="Algo errado!" text={payment.error.message} />
          </MessageContainer>
        )}
      </Card>}
    </StripeContainer>
  );
};

export default SubscriptionPage;
