/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import Background from '../../../components/Background';
import ProblemsCard from './ProblemsCard';

import api from '../../../services/api';

import { Container, HeaderBackground, Title, ListProblems } from './styles';

export default function ViewProblems({ route }) {
  const { id } = route.params;
  const [problems, setProblems] = useState([]);
  const [page] = useState(1);
  const [loading, setLoading] = useState(true);

  async function loadProblems() {
    try {
      const response = await api.get(`orders/problems/${id}`, {
        params: { page },
      });
      setProblems(response.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProblems();
  }, []) //eslint-disable-line

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <Title>Order {problems.id}</Title>
        {loading && page === 1 ? (
          <ActivityIndicator color="#ee4b48" size={30} />
        ) : (
          <>
            {!problems.length ? (
              <Title>No problems registered!</Title>
            ) : (
              <ListProblems
                data={problems}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProblemsCard problem={item} />}
              />
            )}
          </>
        )}
        {loading && page !== 1 && (
          <ActivityIndicator color="#ee4b48" size={30} />
        )}
      </Container>
    </Background>
  );
}
