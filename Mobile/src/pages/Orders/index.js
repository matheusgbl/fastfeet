import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import OrderCard from '../../components/OrderCard';
import DeliveredCard from '../../components/DeliveredCard';

import { signOut } from '../../store/modules/auth/actions';

import {
  Container,
  Content,
  Header,
  Avatar,
  HeaderContent,
  HeaderText,
  Label,
  Name,
  Right,
  Title,
  TitleLabel,
  Aside,
  AsideText,
  AsideTextRight,
} from './styles';

export default function Dashboard({ navigation }) {
  const isFocused = useIsFocused();
  const profile = useSelector((state) => state.deliveryman.profile);
  const name =
    profile.name.split(' ').length > 2
      ? profile.name
          .split(' ')
          .splice(0, 2)
          // eslint-disable-next-line no-return-assign
          .reduce((total, current) => (total += ` ${current}`))
      : profile.name;

  const [, setDeliverymans] = useState(profile);
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveryman() {
      setLoading(true);

      const response = await api.get(`deliveryman/${profile.id}`);

      setDeliverymans(response.data);
      setLoading(false);
    }
    if (isFocused) {
      loadDeliveryman();
    }
  }, [profile.id, isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handlePending() {
    if (active === false) {
      setActive(!active);
      setVisible(!visible);
    }
  }

  function handleDeliveries() {
    if (visible === false) {
      setActive(!active);
      setVisible(!visible);
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <Avatar name={name} size={68} avatar={profile.avatar} />

          <HeaderContent>
            <HeaderText>
              <Label>Welcome</Label>
              <Name>{profile.name}</Name>
            </HeaderText>
          </HeaderContent>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="exit-to-app" size={24} color="#E74040" />
          </TouchableOpacity>
        </Header>

        <Title>
          <TitleLabel>Orders</TitleLabel>

          <Right>
            <Aside onPress={handlePending}>
              <AsideText active={active} visible={visible}>
                Pending
              </AsideText>
            </Aside>
            <Aside onPress={handleDeliveries}>
              <AsideTextRight actie={active} visible={visible}>
                Delivered
              </AsideTextRight>
            </Aside>
          </Right>
        </Title>

        {loading ? (
          <ActivityIndicator size={30} />
        ) : (
          <>
            {active ? (
              <OrderCard navigation={navigation} />
            ) : (
              <DeliveredCard navigation={navigation} />
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
