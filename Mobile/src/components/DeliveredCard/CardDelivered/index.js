import React from 'react';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  HeaderTitle,
  Footer,
  Column,
  FooterLabel,
  FooterContent,
  Button,
  ButtonText,
} from './styles';

import DeliveredProgress from '../DeliveredProgress';

export default function CardDelivered({ data, navigation }) {
  const formattedDate = format(parseISO(data.created_at), 'dd/MM/yyyy', {
    locale: pt,
  });

  function handleDetail() {
    navigation.navigate('Details', { data });
  }

  return (
    <>
      {data.end_date ? (
        <>
          <Container>
            <Header>
              <Icon name="local-shipping" size={32} color="#7d40e7" />
              <HeaderTitle>Order {data.id}</HeaderTitle>
            </Header>

            <DeliveredProgress data={data} />

            <Footer>
              <Column>
                <FooterLabel>Date</FooterLabel>
                <FooterContent>{formattedDate}</FooterContent>
              </Column>
              <Column>
                <FooterLabel>City</FooterLabel>
                <FooterContent>{data.recipient.city}</FooterContent>
              </Column>
              <Column>
                <Button onPress={() => handleDetail(data)}>
                  <ButtonText>Details</ButtonText>
                </Button>
              </Column>
            </Footer>
          </Container>
        </>
      ) : (
        <Header />
      )}
    </>
  );
}
