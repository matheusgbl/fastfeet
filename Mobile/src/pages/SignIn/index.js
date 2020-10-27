import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/fastfeet-logo2.png';
import {
  Container,
  Content,
  Form,
  ErrorLabel,
  FormInput,
  SubmitButton,
} from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    if (!email) setError(true);
    else dispatch(signInRequest(email));
  }

  useEffect(() => {
    setError(false);
  }, [email]);

  return (
    <Container>
      <Content>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="example@email.com"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={email}
            onChangeText={setEmail}
          />

          {error && <ErrorLabel>E-mail required</ErrorLabel>}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Login
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
