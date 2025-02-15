import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { availablePaymentsServiceThunk, ISubscriptionState } from '../../reducers/subscription';

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

  // STEP 2(paymentIntentResponse) -> 4(payment).
  const { 
    availablePaymentsService,
    paymentIntentService,
    paymentConfirmService,
  } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  console.log('[SUBS. UI] availablePaymentsService:', availablePaymentsService);
  console.log('[SUBS. UI] paymentIntentService:', paymentIntentService);
  console.log('[SUBS. UI] paymentConfirmService:', paymentConfirmService);

  const { data: availablePayments } = availablePaymentsService;
  const { data: paymentIntent } = paymentIntentService;
  const { data: payment } = paymentConfirmService;

  const availablePaymentId = availablePayments?.[0]?.id || 0;

  // Available Payments
  const handleAvailablePayments = async () => await dispatch(availablePaymentsServiceThunk());

  // Intent payment
  const handleIntentPayment = async () => await dispatch(paymentIntentServiceThunk({}));

  // Confirm payment
  const handleSubmit = async () => {
    const cardElement = elements?.getElement(CardElement);

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
    // STEP 1.
    if (availablePaymentId) handleIntentPayment();
  }, []);

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  return (
    <StripeContainer data-testid='stripe-container'>
      <AvailablePaymentsContainer>
        <PaymentItem payment={availablePayments?.[0]} />
      </AvailablePaymentsContainer>

      {!!availablePaymentId && <Card>
        <CardElement options={{
          style: {
            base: {
              color: '#fff'
            },
          }
        }} />
        <ButtonContainer>
          <Button onClick={handleSubmit} data-testid="button-login" color='blue' loading={(paymentIntent.status === 'loading')} text='Pagar' />
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
