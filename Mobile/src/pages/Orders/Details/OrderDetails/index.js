/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ActionsCard from '../ActionsCard';

import {
  BackgroundPurple,
  Content,
  Container,
  Card,
  CardSituation,
  CardHeader,
  HeaderText,
  CardContent,
  ContentLabel,
  ContentText,
  Dates,
  Box,
  DateStart,
} from './styles';

export default function OrderDetails({ route }) {
  const { data } = route.params;

  return (
    <Container>
      <BackgroundPurple>
        <Content>
          <>
            <Card>
              <CardHeader>
                <Icon name="local-shipping" size={24} color="#7d40e7" />
                <HeaderText>Delivery Info</HeaderText>
              </CardHeader>

              <CardContent>
                <ContentLabel>RECIPIENT</ContentLabel>
                <ContentText>{data.recipient.name}</ContentText>

                <ContentLabel>ADRESS</ContentLabel>
                <ContentText>
                  {data.recipient.street}, {data.recipient.number},{' '}
                  {data.recipient.city} - {data.recipient.state},{' '}
                  {data.recipient.zipcode}
                </ContentText>

                <ContentLabel>PRODUCT</ContentLabel>
                <ContentText>{data.product}</ContentText>
              </CardContent>
            </Card>

            <CardSituation>
              <CardHeader>
                <Icon name="date-range" size={24} color="#7d40e7" />
                <HeaderText>Delivery Status</HeaderText>
              </CardHeader>

              <CardContent>
                <ContentLabel>STATUS</ContentLabel>
                <ContentText>
                  {data.start_date && !data.end_date
                    ? 'In transit'
                    : !data.start_date && !data.end_date && !data.canceled_at
                    ? 'Pending'
                    : 'Delivered'}
                </ContentText>

                <Dates>
                  <DateStart>
                    <ContentLabel>WITHDRAWAL DATE</ContentLabel>
                    <ContentText>
                      {data.start_date
                        ? format(parseISO(data.start_date), 'dd/MM/yyyy', {
                            locale: pt,
                          })
                        : '--/--/----'}
                    </ContentText>
                  </DateStart>
                  <DateStart>
                    <ContentLabel>DElIVERED AT</ContentLabel>
                    <ContentText>
                      {data.end_date
                        ? format(parseISO(data.end_date), 'dd/MM/yyyy', {
                            locale: pt,
                          })
                        : '--/--/----'}
                    </ContentText>
                  </DateStart>
                </Dates>
              </CardContent>
            </CardSituation>
            {data.end_date ? (
              <>
                <Box />
              </>
            ) : (
              <>
                <ActionsCard data={data} />
              </>
            )}
          </>
        </Content>
      </BackgroundPurple>
    </Container>
  );
}
