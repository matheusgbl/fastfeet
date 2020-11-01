import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const BackgroundPurple = styled.View`
  position: absolute;
  background: #7d40e7;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background: #fff;
`;

export const Content = styled.SafeAreaView`
  margin: 30px 20px;
`;
