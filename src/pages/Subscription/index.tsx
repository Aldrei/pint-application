import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { availablePaymentsServiceThunk, ISubscriptionState } from '../../reducers/subscription';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ButtonContainer, StripeContainer, MessageContainer, AvailablePaymentsContainer } from './styles';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { subscriptionPaymentIntentServiceThunk, subscriptionPaymentServiceThunk } from '../../reducers/subscription';
import { PaymentItem } from './components/PaymentItem';

const SubscriptionPage = (): React.ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  
  const dispatch = useAppDispatch();

  // STEP 2(paymentIntentResponse) -> 4(payment).
  const { 
    statusIntent, 
    paymentIntent,
    status,
    payment, 
    availablePaymentsStatus,
    availablePayments,
  } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  console.log('[SUBS.REDUCER] availablePaymentsStatus:', availablePaymentsStatus);
  console.log('[SUBS.REDUCER] availablePayments:', availablePayments);
  
  console.log('[SUBS.REDUCER] statusIntent:', statusIntent);
  console.log('[SUBS.REDUCER] paymentIntent:', paymentIntent);

  console.log('[SUBS.REDUCER] status:', status);
  console.log('[SUBS.REDUCER] payment:', payment);

  const getAvailablePaymentId = () => availablePayments?.[0]?.id || 0;

  // Available Payments
  const handleAvailablePayments = async () => {
    try {
      await dispatch(availablePaymentsServiceThunk());
    } catch (error) {
      console.log(error);
    }
  };

  // Intent payment
  const handleIntentPayment = async () => {
    try {
      await dispatch(subscriptionPaymentIntentServiceThunk({}));
    } catch (error) {
      console.log(error);
    }
  };

  // Confirm payment
  const handleSubmit = async () => {
    const cardElement = elements?.getElement(CardElement);

    // STEP 3.
    if (getAvailablePaymentId())
      dispatch(subscriptionPaymentServiceThunk({ paymentAvailableId: getAvailablePaymentId(), stripe, cardElement, clientSecret: paymentIntent?.clientSecret, billingDetails: {
        name: 'Name Test'
      }, paymentIntentId: paymentIntent?.paymentIntentId }));
  };

  useEffect(() => {
    // STEP 0.
    handleAvailablePayments();
    // STEP 1.
    if (getAvailablePaymentId()) handleIntentPayment();
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

      {!!getAvailablePaymentId() && <Card>
        <CardElement options={{
          style: {
            base: {
              color: '#fff'
            },
          }
        }} />
        <ButtonContainer>
          <Button onClick={handleSubmit} data-testid="button-login" color='blue' loading={(statusIntent === 'loading')} text='Pagar' />
        </ButtonContainer>
        {status === 'success' && payment.paymentIntent && (
          <MessageContainer>
            <Alert type="success" title="Sucesso!" text="Pagamento executado com sucesso" />
          </MessageContainer>
        )}
        {status === 'failed' && payment.error && (
          <MessageContainer>
            <Alert type="error" title="Algo errado!" text={payment.error.message} />
          </MessageContainer>
        )}
      </Card>}
    </StripeContainer>
  );
};

export default SubscriptionPage;
