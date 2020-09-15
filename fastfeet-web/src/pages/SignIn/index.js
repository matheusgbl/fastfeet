import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import { Container, Content } from './styles';

import logo from '../../assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Put your admin e-mail')
    .required('Please enter a admin e-mail'),
  password: Yup.string().required('Please enter a password'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>E-mail</strong>
          <Input name="email" type="email" placeholder="example@gmail.com" />
          <strong>Password</strong>
          <Input name="password" type="password" placeholder="******" />

          <button type="submit">{loading ? 'loading...' : 'Login'}</button>
        </Form>
      </Content>
    </Container>
  );
}
