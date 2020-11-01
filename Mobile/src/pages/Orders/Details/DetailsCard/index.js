import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Header, HeaderTitle, Label, Text } from './styles';

export default function DetailsCard({ data }) {
  return (
    <Container>
      <Header>
        <Icon name="local-shipping" color="#7d40e7" size={27} />
        <HeaderTitle>Delivery Informations</HeaderTitle>
      </Header>
      <Label>Recipient</Label>
      <Text>{data.recipient.name}</Text>
      <Label>Delivery Address</Label>
      <Text>
        {data.recipient.street}, {data.recipient.number}, {data.recipient.city}{' '}
        - {data.recipient.state}, {data.recipient.cep}
      </Text>
      <Label>Product</Label>
      <Text>{data.product}</Text>
    </Container>
  );
}
