import React, { useEffect } from 'react';

import Card from '../../components/Card';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { ISubscriptionState } from '../../reducers/subscription';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ButtonContainer, LoginContainer } from './styles';

import Button from '../../components/Button';
import { subscriptionPaymentIntentServiceThunk } from '../../reducers/subscription';

const SubscriptionPage = (): React.ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const { paymentIntent: paymentIntentResponse, statusIntent } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  console.log('PAYMENT INTENT:', paymentIntentResponse);
  console.log('PAYMENT INTENT:', paymentIntentResponse);

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

    console.log('HANDLE SUBMIT:', paymentIntentResponse);

    const { error, paymentIntent } = await stripe?.confirmCardPayment(paymentIntentResponse?.clientSecret || '', {
      payment_method: {
        card: cardElement || { token: '' },
        billing_details: {
          name: 'Fulano de Tal',
        },
      },
    }) || { error: '', paymentIntent: '' };

    console.log('ERROR:', error);
    console.log('PAYMENT INTENT:', paymentIntent);
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
      </Card>
    </LoginContainer>
  );
};

export default SubscriptionPage;
