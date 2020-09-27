import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';

import logo from '../../assets/fastfeet-logo.png';
import { Container, Content, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  return (
    <Container>
      <Content>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="send"
            value={email}
            onChangeText={setEmail}
          />

          <SubmitButton loading={loading}>Entrar no sistema</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
