import React, { useState } from 'react';
import { Alert } from 'react-native';

import api from '../../../../services/api';

import {
  Container,
  Background,
  Content,
  Form,
  Input,
  SubmitButton,
} from './styles';

export default function NewProblem({ route }) {
  const { data } = route.params;
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    await api.post(`orders/problems/${data.id}`, {
      description,
    });
    Alert.alert('New problem sucessfully registered.');
  }

  return (
    <Container>
      <Background>
        <Content>
          <Form>
            <Input
              name="description"
              value={description}
              onSubmitEditing={handleSubmit}
              onChangeText={setDescription}
              placeholder="Enter the details about the problem!"
            />

            <SubmitButton onPress={handleSubmit}>Send</SubmitButton>
          </Form>
        </Content>
      </Background>
    </Container>
  );
}
