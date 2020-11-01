import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  height: 85px;
  width: 100%;
  background: #f8f9fd;
  border-radius: 4px;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Label = styled.Text`
  font-size: 11px;
  color: #999;
  line-height: 16px;
  text-align: center;
  width: 56px;
`;

export const Left = styled(RectButton)`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;
`;

export const Center = styled(RectButton)`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;
`;

export const Right = styled(RectButton)`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;
`;
