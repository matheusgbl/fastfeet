import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#7D40E7',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  border: 2px solid #eee;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

export const EmptyCard = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardText = styled.Text`
  color: #999;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
  width: 200px;
`;
