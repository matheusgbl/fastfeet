import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background: #fff;
`;

export const Background = styled.View`
  height: 35%;
  width: 100%;
  background: #7d40e7;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 100px 20px 0;
  width: ${Dimensions.get('window').width}px;
`;

export const Form = styled.View`
  align-self: stretch;
  width: 90%;
`;

export const TInput = styled(Input).attrs({
  textAlignVertical: 'top',
  padding: 0,
})`
  min-height: 250px;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  padding-bottom: ${Platform.OS === 'ios' ? '190px' : '50px'};
  flex: 1;
  text-align: center;
  border: 0;
`;

export const SubmitButton = styled(Button)`
  margin: ${Platform.OS === 'ios' ? '20px 0 10px' : '20px 5px 10px'};
  background: #7d40e7;
`;
