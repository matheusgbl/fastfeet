/* eslint-disable no-nested-ternary */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Alert } from 'react-native';
import api from '../../../../services/api';

import { Container, Label, Left, Center, Right } from './styles';

export default function ActionsCard({ data }) {
  const profile = useSelector((state) => state.deliveryman.profile);
  const navigation = useNavigation();

  const handleAddProblem = async () => {
    if (data.end_date) return;

    navigation.navigate('NewProblem', { id: data.id });
  };

  const handleConfirm = async () => {
    if (data.end_date) return;

    if (data.start_date) {
      navigation.navigate('Confirm', { id: data.id });
      return;
    }

    try {
      await api.put(`deliveryman/${profile.id}/status/${data.id}`, {
        start_date: new Date(),
      });

      Alert.alert('Successfully withdrawn!');

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Failed to confirm delivery.');
    }
  };

  return (
    <Container>
      <Left onPress={() => handleAddProblem()}>
        <Icon name="report-problem" color="#e74040" size={26} />
        <Label>Report Problem</Label>
      </Left>

      <Center
        onPress={() => navigation.navigate('NewProblem', { id: data.id })}
      >
        <Icon name="info-outline" color="#e7ba40" size={26} />
        <Label>View Problem</Label>
      </Center>
      <Right onPress={() => handleConfirm()}>
        <Icon name="check-circle-outline" color="#7d40e7" size={26} />
        <Label>
          {data.end_date
            ? 'Order Delivered'
            : data.start_date
            ? 'Confirm Delivery'
            : 'Confirm Withdral'}
        </Label>
      </Right>
    </Container>
  );
}
