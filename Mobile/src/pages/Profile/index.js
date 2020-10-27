import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import pt from 'date-fns/locale/pt';
import { signOut } from '../../store/modules/auth/actions';
import {
  Container,
  AvatarContainer,
  Avatar,
  Title,
  SubTitle,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector((state) => state.deliveryman.profile);
  const formattedData = format(parseISO(profile.createdAt), 'dd/MM/yyyy', {
    locale: pt,
  });
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <AvatarContainer>
          <Avatar name={profile.name} avatar={profile.avatar} />
        </AvatarContainer>

        <Title>Name</Title>
        <SubTitle>{profile.name}</SubTitle>

        <Title>Email</Title>
        <SubTitle>{profile.email}</SubTitle>

        <Title>Since at</Title>
        <SubTitle>{formattedData}</SubTitle>

        <TouchableOpacity onPress={handleLogout}>
          <LogoutButton>Logout</LogoutButton>
        </TouchableOpacity>
      </Container>
    </>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="account-circle" size={25} color={tintColor} />
);

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarIcon: TabBarIcon,
};
