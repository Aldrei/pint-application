import React, { useState } from 'react';


import { helperDataFormControl } from '../../helpers';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { ISubscriptionState, subscriptionPaymentServiceThunk } from '../../reducers/subscription';

import { ISubscriptionPaymentServiceRequest } from '../../services/subscription';
import { LoginContainer, Row } from './styles';

interface ISubscriptionCard {
  cardName: string;
  cardNumber: string;
  cardValidDate: string;
  cardCcv: string;
}

const SubscriptionPage = (): React.ReactElement => {
  const { status } = useAppSelectorBlaBlaBal('subscriptionReducer') as ISubscriptionState;
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({} as ISubscriptionPaymentServiceRequest);

  const formIsValid = (): boolean => true;

  const handleAuth = () => {
    try {
      if (formIsValid()) dispatch(subscriptionPaymentServiceThunk(form));
    } catch (error) {
      /* istanbul ignore next */ 
      console.error('SubscriptionPage error:', error);
    }
  };

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      const newDataForm = helperDataFormControl<keyof ISubscriptionCard, ISubscriptionCard>(name as keyof ISubscriptionCard, value)(form);

      setForm(newDataForm);
    } catch (error) {
      /* istanbul ignore next */ 
      console.error('handleSetValue error:', error);
    }
  };

  //
  const resolveDateValue = (value: string) => {
    if (value) return value.toDateBRPress();

    return '';
  };

  const resolveIntValue = (value: string) => {
    if (value) return value.onlyNumbers();

    return '';
  };

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  return (
    <LoginContainer data-testid='loginContainer'>
      <Card>
        <Input onChange={handleSetValue} value={form.cardName} data-testid="card-name" name="cardName" placeholder="Seu nome no cartão" />
        <Input onChange={handleSetValue} value={form.cardNumber} data-testid="card-number" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
        <Row>
          <Input onChange={handleSetValue} value={resolveDateValue(form.cardValidDate)} data-testid="card-valid-date" name="cardValidDate" placeholder="XX/XX" />
          <Input onChange={handleSetValue} value={resolveIntValue(form.cardCcv)} data-testid="card-ccv" name="cardCcv" placeholder="CCV" />
        </Row>
        <Button onClick={handleAuth} data-testid="button-login" color='blue' disabled={!formIsValid()} loading={(status === 'loading')} text='Pagar' />
        {status === 'failed' && (<Alert type="error" title="Tente novamente" text="Email ou senha inválido!" />)}
      </Card>
    </LoginContainer>
  );
};

export default SubscriptionPage;
