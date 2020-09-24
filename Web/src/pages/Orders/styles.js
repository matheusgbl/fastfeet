import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const Title = styled.div`
  margin: 0;
  text-align: center;

  strong {
    font-size: 26px;
    color: ${props => props.theme.colors.text};
  }
`;

export const PageActions = styled.div`
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }

  button {
    display: flex;
    width: 120px;
    height: 36px;
    justify-content: center;
    align-items: center;
    background: '#7d40e7';

    border: 0;
    border-radius: 6px;
    transition: background 0.4s;

    &:hover {
      background: ${darken(0.2, '#7d40e7')};
    }

    strong {
      color: #fff;
      font-size: 14px;
      margin-left: 5px;
    }
  }
`;

export const AddOrder = styled(Link)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #7d40e7;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background: ${darken(0.05, '#7d40e7')};
  }
`;

export const Content = styled.table`
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  width: 100%;

  thead {
    display: block;
    margin-bottom: 10px;

    tr {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
    }

    th {
      flex: 1px;
      text-align: left;
      color: ${props => props.theme.colors.text};
      font-size: 14px;
      :last-child {
        text-align: right;
        margin-right: 10px;
      }
    }
  }

  tbody {
    display: block;
    height: 380px;
    width: 100%;
    overflow: visible;

    tr {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: ${props => props.theme.colors.trbk};
      height: 60px;
      padding: 5px 10px;
      border-radius: 4px;
      margin-bottom: 15px;
    }

    td {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 14px;
      color: ${props => props.theme.colors.text};
      main {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :last-child {
        justify-content: flex-end;
        margin-right: 20px;
      }

      img {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        margin-right: 5px;
      }

      button {
        background: none;
        border: 0;
        align-items: center;
        color: #999;
        cursor: pointer;

        svg {
          align-self: flex-end;
        }
      }
    }
  }
`;

export const ActionsContainer = styled.div`
  position: relative;
`;

export const NavPage = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.text};
  > button {
    color: ${props => props.theme.colors.text};
    border: 0;
    background: none;
    cursor: pointer;
  }
`;

export const NavPageButton = styled.button.attrs({
  type: 'button',
})`
  color: ${props => props.theme.colors.text};
  border: 0;
  background: none;
  cursor: ${props => (props.disabled ? null : 'pointer')};
  opacity: ${props => (props.disabled ? 0 : 1)};
`;
