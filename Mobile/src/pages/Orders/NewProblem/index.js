import React, { useState } from 'react';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  Container,
  Background,
  Content,
  Form,
  TInput,
  SubmitButton,
} from './styles';

export default function NewProblem({ route }) {
  const { id } = route.params;
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    await api.post(`orders/problems/${id}`, {
      description,
    });
    Alert.alert('New problem sucessfully registered.');
  }

  return (
    <Container>
      <Background>
        <Content>
          <Form>
            <TInput
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Enter the details about the problem!"
              autoCorrect={false}
              multiline
              numberOfLines={8}
              name="description"
              returnKeyType="send"
              value={description}
              onSubmitEditing={handleSubmit}
              onChangeText={setDescription}
            />

            <SubmitButton onPress={handleSubmit}>Send</SubmitButton>
          </Form>
        </Content>
      </Background>
    </Container>
  );
}
