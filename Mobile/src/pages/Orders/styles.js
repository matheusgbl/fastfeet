import styled from 'styled-components/native';
import CustomAvatar from '../../components/Avatar';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background: #fff;
`;
export const Content = styled.SafeAreaView`
  flex: 1;
`;
export const Header = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Avatar = styled(CustomAvatar)``;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.View`
  margin-left: -50px;
`;

export const Label = styled.Text`
  color: #666;
`;

export const Name = styled.Text`
  margin-top: 3px;
  font-weight: bold;
  color: #333;
  font-size: 24px;
`;

export const Title = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Right = styled.View`
  flex-direction: row;
`;

export const TitleLabel = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Aside = styled.TouchableOpacity``;

export const AsideText = styled.Text`
  margin-right: 7px;
  margin-left: 7px;
  color: ${(props) => (props.active ? '#7D40E7' : '#999')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export const AsideTextRight = styled.Text`
  margin-right: 7px;
  margin-left: 7px;
  color: ${(props) => (props.visible ? '#7D40E7' : '#999')};
  font-weight: ${(props) => (props.visible ? 'bold' : 'normal')};
`;

export const NoOrder = styled.Text`
  margin-top: 220px;
  color: #000;
  font-size: 24px;
  justify-content: center;
  text-align: center;
`;
