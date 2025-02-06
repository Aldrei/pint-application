import React, { useEffect } from 'react';

import Card from '../../components/Card';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { ISubscriptionState } from '../../reducers/subscription';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ButtonContainer, LoginContainer, MessageContainer } from './styles';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { subscriptionPaymentIntentServiceThunk, subscriptionPaymentServiceThunk } from '../../reducers/subscription';

const SubscriptionPage = (): React.ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  
  const dispatch = useAppDispatch();

  const { paymentIntent: paymentIntentResponse, statusIntent, payment, status } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  console.log('PAYMENT INTENT:', paymentIntentResponse);
  console.log('PAYMENT INTENT:', paymentIntentResponse);

  console.log('PAYMENT CONFIRMATION payment:', payment);

  // Intent payment
  const handleIntentPayment = async () => {
    try {
      const response = await dispatch(subscriptionPaymentIntentServiceThunk({}));
      console.log('PAYMENT INTENT RESPONSE:', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleIntentPayment();
  }, []);

  // Confirm payment
  const handleSubmit = async () => {
    const cardElement = elements?.getElement(CardElement);

    dispatch(subscriptionPaymentServiceThunk({ stripe, cardElement, clientSecret: paymentIntentResponse?.clientSecret, billingDetails: {
      name: 'Name Test'
    } }));
  };

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  return (
    <LoginContainer data-testid='loginContainer'>
      <Card>
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
      </Card>
    </LoginContainer>
  );
};

export default SubscriptionPage;
