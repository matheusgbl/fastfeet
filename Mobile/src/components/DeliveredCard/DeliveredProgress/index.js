/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

import { Container, List, Content, Step, Circle, Name } from './styles';

export default function DeliveredProgress({ data }) {
  const [progress, setProgress] = useState([
    { key: 1, label: 'Waiting', active: true },
    { key: 2, label: 'Withdrawal', active: false },
    { key: 3, label: 'Delivered', active: false },
  ]);

  useEffect(() => {
    async function loadStatus() {
      if (data.end_date) {
        setProgress([
          { key: 1, label: 'Waiting', active: false },
          { key: 2, label: 'Withdrawal', active: false },
          { key: 3, label: 'Delivered', active: true },
        ]);
      }
    }
    loadStatus();
  }, [data]);

  return (
    <Container>
      <List
        data={progress}
        keyExtractor={(progress) => String(progress.key)}
        renderItem={({ item }) => (
          <Content>
            <Step>
              <Circle active={item.active} />
              <Name>{item.label}</Name>
            </Step>
          </Content>
        )}
      />
    </Container>
  );
}
