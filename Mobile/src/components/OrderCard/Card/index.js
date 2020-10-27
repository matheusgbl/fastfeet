/* eslint-disable no-shadow */
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  ButtonText,
} from './styles';

import ProgressBar from '../ProgressBar';

export default function Card({ data, navigation }) {
  const formattedDate = format(parseISO(data.created_at), 'dd/MM/yyyy', {
    locale: pt,
  });

  function handleDetails(data) {
    navigation.navigate('Details', { data });
  }

  return (
    <>
      {!data.end_date ? (
        <>
          <Container>
            <Header>
              <Icon name="local-shipping" size={30} color="#7d40e7" />
              <HeaderTitle>Order {data.id}</HeaderTitle>
            </Header>

            <ProgressBar data={data} />

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
                <TouchableOpacity onPress={() => handleDetails(data)}>
                  <ButtonText>Details</ButtonText>
                </TouchableOpacity>
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
