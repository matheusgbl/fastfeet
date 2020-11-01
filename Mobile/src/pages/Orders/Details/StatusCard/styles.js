import styled from 'styled-components/native';

export const Container = styled.View`
  height: 160px;
  width: 100%;
  padding: 15px 12px 10px;
  border-radius: 4px;
  border: 2px solid #eee;
  margin-top: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  color: #7d40e7;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  color: #999;
  line-height: 16px;
  text-transform: uppercase;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #666;
  line-height: 21px;
  margin-bottom: 10px;
`;

export const Date = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Withdrawn = styled.View``;

export const Delivered = styled.View``;
