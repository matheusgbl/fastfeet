/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Card from './Card';

import api from '../../services/api';

import {
  Container,
  Loading,
  List,
  Content,
  EmptyCard,
  CardText,
} from './styles';

export default function OrderCard({ navigation }) {
  const profile = useSelector((state) => state.deliveryman.profile);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      const response = await api.get(`/orders/${profile.id}`);

      setOrders(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    loadOrders();
  }, [profile.id, page]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {orders.length < 1 ? (
            <>
              <Content>
                <EmptyCard>
                  <Icon name="local-shipping" size={50} color="#999" />
                  <CardText>You do not have any order registered.</CardText>
                </EmptyCard>
              </Content>
            </>
          ) : (
            <List
              data={orders}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Card data={item} navigation={navigation} />
              )}
            />
          )}
        </>
      )}
    </Container>
  );
}
