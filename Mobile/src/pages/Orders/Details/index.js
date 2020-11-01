import React from 'react';

import DetailsCard from './DetailsCard';
import StatusCard from './StatusCard';
import ActionsCard from './ActionsCard';

import { BackgroundPurple, Content, Container } from './styles';

export default function OrderDetails({ route }) {
  const { data } = route.params;

  return (
    <Container>
      <BackgroundPurple>
        <Content>
          <DetailsCard data={data} />
          <StatusCard data={data} />
          <ActionsCard data={data} />
        </Content>
      </BackgroundPurple>
    </Container>
  );
}
