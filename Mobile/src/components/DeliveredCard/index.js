/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import CardDelivered from './CardDelivered';

import api from '../../services/api';

import { List, Loading, Content, EmptyCard, CardText } from './styles';

export default function DeliveredCard({ navigation }) {
  const profile = useSelector((state) => state.deliveryman.profile);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);

      const response = await api.get(`deliveryman/${profile.id}/orders`);

      setOrders(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    loadOrders();
  }, [profile.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {orders.length < 1 ? (
            <Content>
              <EmptyCard>
                <Icon name="local-shipping" size={30} />
                <CardText>You have no delivered orders</CardText>
              </EmptyCard>
            </Content>
          ) : (
            <>
              <List
                data={orders}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <CardDelivered navigation={navigation} data={item} />
                )}
                onEndReachedThreshold={0.5}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
