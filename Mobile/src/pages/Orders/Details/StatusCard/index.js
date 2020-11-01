import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';

import {
  Container,
  Header,
  HeaderTitle,
  Label,
  Text,
  Date,
  Withdrawn,
  Delivered,
} from './styles';

export default function StatusCard({ data }) {
  const startDate = data.start_date
    ? format(parseISO(data.start_date), 'dd / MM / yyy', {
        locale: pt,
      })
    : '- - / - - / - -';

  const endDate = data.end_date
    ? format(parseISO(data.end_date), 'dd / MM / yyy', {
        locale: pt,
      })
    : '- - / - - / - -';

  let status = 'Pending';
  if (data.canceled_at) status = 'Canceled';
  else if (data.end_date) status = 'Delivered';
  else if (data.start_date) status = 'withdrawn';
  return (
    <Container>
      <Header>
        <Icon name="date-range" color="#7d40e7" size={27} />
        <HeaderTitle>Delivery Info</HeaderTitle>
      </Header>
      <Label>Status</Label>
      <Text>{status}</Text>
      <Date>
        <Withdrawn>
          <Label>Date of Withdrawal</Label>
          <Text>{startDate}</Text>
        </Withdrawn>
        <Delivered>
          <Label>Delivery Date</Label>
          <Text>{endDate}</Text>
        </Delivered>
      </Date>
    </Container>
  );
}
